import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { SCHEMES, FREQUENT_GOVERNMENT_TERMS, HELPLINE_CONTACTS } from '../src/data/schemesData.js';
import { INITIAL_MEDICATIONS, SAMPLE_PRESCRIPTIONS, CAREGIVER_PROFILE, MEDICAL_HISTORY } from '../src/data/vaidyaData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files if built
app.use(express.static(path.join(__dirname, '../dist')));

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// In-memory store for applications and tracking (simulating DB)
const applicationsDB = new Map([
  [
    'KSSM-2026-89412',
    {
      refNumber: 'KSSM-2026-89412',
      schemeId: 'ignaoap',
      schemeName_ml: 'ഇന്ദിരാഗാന്ധി ദേശീയ വാർദ്ധക്യകാല പെൻഷൻ',
      schemeName_en: 'Indira Gandhi National Old Age Pension',
      applicantName: 'ശ്രീധരൻ നായർ (Sreedharan Nair)',
      age: 68,
      district: 'Thiruvananthapuram',
      localBody: 'Nemom Grama Panchayat, Ward 4',
      status: 'WARD_VERIFICATION',
      statusText_ml: 'വാർഡ് മെമ്പർ/സെക്രട്ടറി പരിശോധന പുരോഗമിക്കുന്നു',
      statusText_en: 'Ward Secretary Field Verification in Progress',
      timeline: [
        { date: '2026-10-14', step: 'അപേക്ഷ അക്ഷയ കേന്ദ്രത്തിൽ രജിസ്റ്റർ ചെയ്തു (Akshaya Submitted)', done: true },
        { date: '2026-10-22', step: 'ഗ്രാമപഞ്ചായത്ത് ഫയൽ സ്വീകരിച്ചു (File Acknowledged by LSGD)', done: true },
        { date: '2026-11-02', step: 'വാർഡ് തല അന്വേഷണം നടക്കുന്നു (Field Inspection ongoing)', current: true },
        { date: 'TBD', step: 'പഞ്ചായത്ത് കമ്മിറ്റി അംഗീകാരം (Committee Approval)', pending: true },
        { date: 'TBD', step: 'ആദ്യ മാസ പെൻഷൻ വിതരണം (First Pension Disbursal)', pending: true }
      ],
      nextAction_ml: 'വാർഡ് സെക്രട്ടറി ഭവന സന്ദർശനം നടത്തുമ്പോൾ റേഷൻ കാർഡും ആധാർ ഒറിജിനലും കാണിക്കുക.',
      nextAction_en: 'Keep original Ration Card and Aadhaar handy for secretary home inspection.'
    }
  ]
]);

// 1. Get Schemes
app.get('/api/schemes', (req, res) => {
  const { category, search } = req.query;
  let results = [...SCHEMES];

  if (category && category !== 'all') {
    results = results.filter(s => s.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(s =>
      s.name_ml.toLowerCase().includes(q) ||
      s.name_en.toLowerCase().includes(q) ||
      s.target_group_ml.toLowerCase().includes(q) ||
      s.target_group_en.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

// 2. Get Single Scheme
app.get('/api/schemes/:id', (req, res) => {
  const scheme = SCHEMES.find(s => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }
  res.json({ success: true, data: scheme });
});

// 3. Eligibility Assessment
app.post('/api/eligibility/assess', (req, res) => {
  const { age, isDiffAbled, disabilityPct, annualIncome, hasBplCard, isBedridden, residesInKerala, isUrban } = req.body;

  const userAge = parseInt(age, 10) || 0;
  const userIncome = parseInt(annualIncome, 10) || 0;
  const userDisability = isDiffAbled ? (parseInt(disabilityPct, 10) || 40) : 0;

  const matches = [];

  SCHEMES.forEach(scheme => {
    let eligible = true;
    const reasons_ml = [];
    const reasons_en = [];

    // Kerala residency
    if (!residesInKerala) {
      eligible = false;
      reasons_ml.push('കേരളത്തിൽ സ്ഥിരതാമസക്കാരനായിരിക്കണം.');
      reasons_en.push('Requires permanent Kerala residency.');
    }

    // Age check
    if (scheme.min_age > 0 && userAge < scheme.min_age) {
      eligible = false;
      reasons_ml.push(`കുറഞ്ഞ പ്രായം ${scheme.min_age} വയസ്സാണ് (നിലവിലെ പ്രായം: ${userAge}).`);
      reasons_en.push(`Minimum age is ${scheme.min_age} (current age: ${userAge}).`);
    }

    // Income check
    if (scheme.max_income < 9999999 && !hasBplCard && userIncome > scheme.max_income) {
      eligible = false;
      reasons_ml.push(`കുടുംബ വാർഷിക വരുമാനം ₹${scheme.max_income.toLocaleString('en-IN')} കവിയരുത്.`);
      reasons_en.push(`Annual income must be under ₹${scheme.max_income.toLocaleString('en-IN')}.`);
    }

    // Disability check
    if (scheme.requires_disability) {
      if (!isDiffAbled) {
        eligible = false;
        reasons_ml.push('ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് ഉള്ളവർക്ക് മാത്രമുള്ളതാണ്.');
        reasons_en.push('Requires certified disability certificate.');
      } else if (scheme.min_disability_pct && userDisability < scheme.min_disability_pct) {
        eligible = false;
        reasons_ml.push(`കുറഞ്ഞത് ${scheme.min_disability_pct}% വൈകല്യം സാക്ഷ്യപ്പെടുത്തിയിരിക്കണം.`);
        reasons_en.push(`Requires at least ${scheme.min_disability_pct}% certified disability.`);
      }
    }

    // Caregiver bedridden check
    if (scheme.id === 'aswasakiranam' && !isBedridden) {
      eligible = false;
      reasons_ml.push('പൂർണ്ണമായും കിടപ്പിലായ രോഗിയെ പരിചരിക്കുന്നവർക്ക് മാത്രമുള്ളതാണ്.');
      reasons_en.push('Applicable for caregivers of completely bedridden individuals.');
    }

    // Urban check for Vayomithram
    if (scheme.id === 'vayomithram' && !isUrban) {
      eligible = false;
      reasons_ml.push('മുനിസിപ്പാലിറ്റി / കോർപ്പറേഷൻ പരിധിയിലുള്ളവർക്കാണ് ഈ സേവനം.');
      reasons_en.push('Currently operational in Municipality and Corporation limits.');
    }

    matches.push({
      scheme,
      eligible,
      reasons_ml,
      reasons_en,
      matchScore: eligible ? 100 : Math.max(20, 100 - (reasons_ml.length * 30))
    });
  });

  // Sort by eligible first, then matchScore descending
  matches.sort((a, b) => (b.eligible === a.eligible ? b.matchScore - a.matchScore : b.eligible ? 1 : -1));

  res.json({
    success: true,
    userProfile: { userAge, userIncome, userDisability, hasBplCard, isBedridden },
    results: matches
  });
});

// 4. Conversational AI Assistant
app.post('/api/voice/assistant', (req, res) => {
  const { message, step, userAnswers = {}, language = 'ml' } = req.body;
  const text = (message || '').toLowerCase();

  // Conversational response logic tailored for senior citizens and persons with disabilities
  let reply_ml = "";
  let reply_en = "";
  let nextStep = step || 'welcome';
  let detectedInfo = {};
  let suggestedActions = [];

  if (text.includes('നമസ്കാരം') || text.includes('ഹലോ') || text.includes('hello') || text.includes('തുടങ്ങുക') || step === 'welcome') {
    reply_ml = "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ അവകാശ സഹായിയാണ്. കേരള സർക്കാരിന്റെ ഏത് ക്ഷേമ പദ്ധതികൾക്കാണ് നിങ്ങൾക്ക് അർഹതയുള്ളതെന്ന് നമുക്ക് എളുപ്പത്തിൽ കണ്ടെത്താം. നിങ്ങളുടെ പ്രായം എത്രയാണെന്ന് പറയാമോ?";
    reply_en = "Hello! I am your AI Rights Navigator. Let us find out which Kerala welfare schemes you are eligible for. Could you tell me your age?";
    nextStep = 'ask_age';
    suggestedActions = ['60 വയസ്സിന് മുകളിൽ', '60 വയസ്സിൽ താഴെ'];
  } else if (step === 'ask_age' || text.match(/\d+/) || text.includes('വയസ്സ') || text.includes('age')) {
    const ageMatch = text.match(/\d+/);
    const age = ageMatch ? parseInt(ageMatch[0], 10) : 62;
    detectedInfo.age = age;

    if (age >= 60) {
      reply_ml = `നിങ്ങൾക്ക് ${age} വയസ്സുണ്ടെന്ന് മനസ്സിലായി. അടുത്തതായി ചോദിക്കട്ടെ: നിങ്ങളുടെ കുടുംബത്തിൽ മുൻഗണനാ റേഷൻ കാർഡ് (മഞ്ഞ അല്ലെങ്കിൽ പിങ്ക്) ഉണ്ടോ? അതോ വാർഷിക വരുമാനം 1 ലക്ഷത്തിൽ താഴെയാണോ?`;
      reply_en = `Understood, your age is ${age}. Next question: Does your family have a priority Ration Card (Yellow or Pink) or annual income under ₹1 Lakh?`;
      nextStep = 'ask_income';
      suggestedActions = ['അതെ, മുൻഗണനാ കാർഡ് ഉണ്ട്', 'ഇല്ല, വരുമാനം 1 ലക്ഷത്തിന് മുകളിലാണ്'];
    } else {
      reply_ml = `നിങ്ങൾക്ക് ${age} വയസ്സുണ്ടെന്ന് മനസ്സിലായി. നിങ്ങൾക്കോ നിങ്ങളുടെ കുടുംബാംഗങ്ങൾക്കോ എന്തെങ്കിലും ശാരീരിക/മാനസിക ഭിന്നശേഷിയോ (Disability) മെഡിക്കൽ സർട്ടിഫിക്കറ്റോ ഉണ്ടോ?`;
      reply_en = `Got it, your age is ${age}. Do you or your family member have any physical or mental disability certificate?`;
      nextStep = 'ask_disability';
      suggestedActions = ['അതെ, 40% സർട്ടിഫിക്കറ്റ് ഉണ്ട്', 'ഇല്ല, ഭിന്നശേഷിയില്ല'];
    }
  } else if (step === 'ask_income' || text.includes('റേഷൻ') || text.includes('ഉണ്ട്') || text.includes('ഇല്ല')) {
    const hasBpl = text.includes('ഉണ്ട്') || text.includes('yes') || text.includes('മഞ്ഞ') || text.includes('പിങ്ക്');
    detectedInfo.hasBplCard = hasBpl;

    reply_ml = "വളരെ നല്ലത്. നിങ്ങൾക്ക് ഇന്ദിരാഗാന്ധി വാർദ്ധക്യകാല പെൻഷനും (പ്രതിമാസം ₹1,600), കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി വഴിയുള്ള ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ ചികിത്സയ്ക്കും അർഹതയുണ്ടെന്ന് കാണുന്നു. ഇതിന്റെ അപേക്ഷാ നടപടിക്രമങ്ങൾ കേൾക്കണോ, അതോ ആവശ്യമായ രേഖകളുടെ ലിസ്റ്റ് കാണിക്കണോ?";
    reply_en = "Very good. You appear eligible for the Indira Gandhi Old Age Pension (₹1,600/month) and KASP free hospital treatment up to ₹5 Lakhs. Would you like to hear the application steps or see the required documents?";
    nextStep = 'explain_scheme';
    suggestedActions = ['രേഖകൾ എന്തൊക്കെയാണ്?', 'അപേക്ഷ എങ്ങനെ നൽകണം?', 'അക്ഷയയിൽ പോകണോ?'];
  } else if (text.includes('രേഖ') || text.includes('document')) {
    reply_ml = "ആവശ്യമായ പ്രധാന രേഖകൾ: 1. ആധാർ കാർഡ്, 2. റേഷൻ കാർഡ്, 3. പ്രായം തെളിയിക്കുന്ന രേഖ (വോട്ടർ ഐഡി അല്ലെങ്കിൽ സ്കൂൾ സർട്ടിഫിക്കറ്റ്), 4. ബാങ്ക് പാസ്സ്ബുക്ക്. ഇവയുടെ ഫോട്ടോ ഉണ്ടെങ്കിൽ 'രേഖ പരിശോധന' പേജിൽ അപ്‌ലോഡ് ചെയ്താൽ ഞാൻ പരിശോധിച്ച് നൽകാം.";
    reply_en = "Key documents required: 1. Aadhaar Card, 2. Ration Card, 3. Age proof (Voter ID/School certificate), 4. Bank passbook. You can upload them in the Document Intelligence page and I will verify them.";
    nextStep = 'ready_draft';
    suggestedActions = ['രേഖ പരിശോധനയിലേക്ക് പോകുക', 'അപേക്ഷ തയ്യാറാക്കുക'];
  } else if (text.includes('അക്ഷയ') || text.includes('akshaya') || text.includes('വിരലടയാളം') || text.includes('biometric')) {
    reply_ml = "പ്രധാന അറിയിപ്പ്: കേരളത്തിൽ പെൻഷൻ അപേക്ഷകൾക്ക് അക്ഷയ കേന്ദ്രത്തിൽ നേരിട്ടെത്തി വിരലടയാളം (ബയോമെട്രിക്) നൽകേണ്ടതുണ്ട്. ഞങ്ങളുടെ ആപ്പിലൂടെ അപേക്ഷയുടെ കരട് ഫോറം തയ്യാറാക്കി പ്രിന്റൗട്ട് എടുത്ത് അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ നൽകിയാൽ കാര്യങ്ങൾ വളരെ എളുപ്പമാകും!";
    reply_en = "Important Note: For Kerala welfare pensions, you must visit an Akshaya Centre for biometric verification. You can prepare your complete draft here, take a printout, and complete the procedure at Akshaya easily!";
    suggestedActions = ['അടുത്തുള്ള അക്ഷയ വിവരങ്ങൾ', 'അപേക്ഷ തയ്യാറാക്കുക'];
  } else {
    reply_ml = "തീർച്ചയായും. നിങ്ങളുടെ ക്ഷേമ അവകാശങ്ങളെക്കുറിച്ച് ഞാൻ സഹായിക്കാം. വാർദ്ധക്യകാല പെൻഷൻ, ഭിന്നശേഷി ആനുകൂല്യങ്ങൾ, ആശ്വാസകിരണം, സൗജന്യ ചികിത്സ എന്നിവയെക്കുറിച്ച് ചോദിക്കാം. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?";
    reply_en = "Certainly! I am here to assist with your rights. You can ask about Old Age Pension, Disability benefits, Aswasakiranam, or Free Healthcare. What would you like to know?";
    suggestedActions = ['വാർദ്ധക്യകാല പെൻഷൻ', 'ഭിന്നശേഷി പെൻഷൻ', 'ആരോഗ്യ ഇൻഷുറൻസ്'];
  }

  res.json({
    success: true,
    response_ml: reply_ml,
    response_en: reply_en,
    nextStep,
    detectedInfo,
    suggestedActions,
    audioPhonetics: reply_ml
  });
});

// 5. Document Intelligence & OCR Extraction Simulation
app.post('/api/documents/analyze', upload.single('document'), (req, res) => {
  const { docType = 'aadhaar', simulatedText } = req.body;

  let analysis = {
    documentType: docType,
    verified: true,
    confidence: 0.94,
    extractedFields: {},
    missingFields: [],
    explanation_ml: "",
    explanation_en: "",
    termsExplained: []
  };

  if (docType === 'aadhaar') {
    analysis.extractedFields = {
      name: 'ശ്രീധരൻ നായർ (Sreedharan Nair)',
      dob: '12/05/1958',
      calculatedAge: 68,
      gender: 'Male / പുരുഷൻ',
      aadhaarMasked: 'XXXX-XXXX-8941',
      address: 'ശാന്തി ഭവൻ, നേമം, തിരുവനന്തപുരം - 695020'
    };
    analysis.explanation_ml = "ആധാർ വിജയകരമായി വായിച്ചെടുത്തു. പ്രായം 68 വയസ്സ് ഉള്ളതിനാൽ വാർദ്ധക്യകാല പെൻഷന് പ്രായപരിധി പൂർണ്ണമായും തികഞ്ഞിട്ടുണ്ട്.";
    analysis.explanation_en = "Aadhaar verified successfully. Age 68 satisfies the criteria for Old Age Pension.";
    analysis.termsExplained.push({
      term: 'Aadhaar NPCI Mapping',
      explanation_ml: 'പെൻഷൻ തുക തടസ്സമില്ലാതെ അക്കൗണ്ടിലെത്താൻ ബാങ്കിൽ ആധാർ ലിങ്ക് ചെയ്യണം.'
    });
  } else if (docType === 'disability_cert') {
    analysis.extractedFields = {
      applicantName: 'സുരേഷ് കുമാർ (Suresh Kumar)',
      certNumber: 'DMC/TVM/2024/7712',
      disabilityType: 'Locomotor Disability (ചലന വൈകല്യം)',
      disabilityPercentage: '55%',
      boardIssuingAuthority: 'General Hospital Thiruvananthapuram',
      validity: 'Permanent / സ്ഥിരമായത്'
    };
    analysis.explanation_ml = "മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റിൽ 55% വൈകല്യം രേഖപ്പെടുത്തിയിട്ടുണ്ട്. 40 ശതമാനത്തിൽ കൂടുതൽ ഉള്ളതിനാൽ ഭിന്നശേഷി പെൻഷനും UDID കാർഡിനും അർഹതയുണ്ട്.";
    analysis.explanation_en = "Medical Board Certificate confirms 55% locomotor disability (exceeds the 40% threshold for PwD pension).";
    analysis.termsExplained.push({
      term: 'Benchmark Disability (40%+)',
      explanation_ml: 'നിയമപ്രകാരം സർക്കാർ ആനുകൂല്യങ്ങൾക്ക് കുറഞ്ഞത് 40% വൈകല്യം സാക്ഷ്യപ്പെടുത്തിയിരിക്കണം.'
    });
  } else if (docType === 'ration_card') {
    analysis.extractedFields = {
      cardCategory: 'PHH (പിങ്ക് കാർഡ് - മുൻഗണനാ വിഭാഗം)',
      cardNo: '1408192837',
      headOfFamily: 'സരസ്വതി അമ്മ',
      totalMembers: 3,
      taluk: 'നെയ്യാറ്റിൻകര'
    };
    analysis.explanation_ml = "നിങ്ങളുടെ കാർഡ് പിങ്ക് മുൻഗണനാ (PHH) കാർഡാണ്. അതിനാൽ പെൻഷനുകൾക്കും സൗജന്യ KASP ഇൻഷുറൻസിനും വില്ലേജ് ഓഫീസിൽ നിന്നുള്ള പ്രത്യേക വരുമാന സർട്ടിഫിക്കറ്റ് നിർബന്ധമല്ല.";
    analysis.explanation_en = "Your card is a Pink Priority (PHH) card, qualifying you for pensions and free KASP healthcare without separate income proofs.";
  } else {
    analysis.extractedFields = {
      documentName: 'സർട്ടിഫിക്കറ്റ്',
      verifiedDate: '2026-10-15',
      authority: 'കേരള റവന്യൂ വകുപ്പ്'
    };
    analysis.explanation_ml = "രേഖ വിജയകരമായി പരിശോധിച്ചു.";
    analysis.explanation_en = "Document verified successfully.";
  }

  res.json({ success: true, analysis });
});

// 6. Application Draft Preparation
app.post('/api/applications/draft', (req, res) => {
  const { schemeId, applicantData } = req.body;
  const scheme = SCHEMES.find(s => s.id === schemeId) || SCHEMES[0];

  const refNumber = `NAVA-${Date.now().toString().slice(-6)}`;
  const draft = {
    refNumber,
    createdAt: new Date().toISOString(),
    schemeId: scheme.id,
    schemeName_ml: scheme.name_ml,
    schemeName_en: scheme.name_en,
    monthlyBenefit: scheme.monthly_amount ? `₹${scheme.monthly_amount}/മാസം` : 'സൗജന്യ സേവനം',
    applicantData: {
      fullName: applicantData.fullName || 'ശ്രീധരൻ നായർ',
      age: applicantData.age || 68,
      gender: applicantData.gender || 'പുരുഷൻ',
      phone: applicantData.phone || '9876543210',
      aadhaarMasked: applicantData.aadhaarMasked || 'XXXX-XXXX-8941',
      rationCardNo: applicantData.rationCardNo || '1408192837',
      address: applicantData.address || 'നേമം, തിരുവനന്തപുരം',
      bankName: applicantData.bankName || 'കേരള ഗ്രാമീൺ ബാങ്ക് (Kerala Gramin Bank)',
      accountNoMasked: applicantData.accountNoMasked || 'XXXXXX7842',
      ifscCode: applicantData.ifscCode || 'KLGB0004123'
    },
    checklist: scheme.required_documents_ml.map(doc => ({
      document: doc,
      status: 'Ready (തയ്യാർ)'
    })),
    mandatoryHumanSteps_ml: [
      "1. ഈ അപേക്ഷയുടെ പ്രിന്റൗട്ട് എടുക്കുക.",
      "2. അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ പോയി ബയോമെട്രിക് (വിരലടയാളം) നൽകി സേവന പോർട്ടലിൽ സബ്മിറ്റ് ചെയ്യുക.",
      "3. അക്ഷയയിൽ നിന്നുള്ള രസീതും രേഖകളുടെ പകർപ്പും തദ്ദേശ സ്വയംഭരണ സ്ഥാപനത്തിൽ (പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി) സമർപ്പിക്കുക."
    ],
    mandatoryHumanSteps_en: [
      "1. Download or print this Application Summary Draft.",
      "2. Visit nearest Akshaya Centre for biometric thumbprint authentication on Sevana portal.",
      "3. Submit physical copy and Akshaya receipt to local Grama Panchayat / Municipality."
    ],
    status: 'DRAFT_READY',
    warning_ml: 'ശ്രദ്ധിക്കുക: ഈ അപേക്ഷ ഒരു കരട് (Draft) മാത്രമാണ്. അക്ഷയ കേന്ദ്രം വഴിയുള്ള ബയോമെട്രിക് സ്ഥിരീകരണം ഇല്ലാതെ ഇത് സർക്കാരിലേക്ക് പൂർണ്ണമായി സമർപ്പിക്കപ്പെടില്ല.'
  };

  applicationsDB.set(refNumber, {
    refNumber,
    schemeId: scheme.id,
    schemeName_ml: scheme.name_ml,
    schemeName_en: scheme.name_en,
    applicantName: applicantData.fullName || 'അപേക്ഷകൻ',
    age: applicantData.age || 68,
    status: 'DRAFT_GENERATED',
    statusText_ml: 'അപേക്ഷ കരട് തയ്യാറായി (Akshaya സന്ദർശനം കാത്തിരിക്കുന്നു)',
    statusText_en: 'Draft Prepared (Pending Akshaya Verification)',
    timeline: [
      { date: new Date().toLocaleDateString(), step: 'അപേക്ഷാ കരട് തയ്യാറാക്കി (AI Draft Generated)', done: true },
      { date: 'Pending', step: 'അക്ഷയ കേന്ദ്രത്തിലെ ബയോമെട്രിക് സമർപ്പണം (Akshaya Biometric)', current: true },
      { date: 'Pending', step: 'ഗ്രാമപഞ്ചായത്ത് ഫീൽഡ് ഇൻസ്പെക്ഷൻ (Field Enquiry)', pending: true },
      { date: 'Pending', step: 'പെൻഷൻ തുക അനുവദിക്കൽ (Sanction Order)', pending: true }
    ],
    nextAction_ml: 'തയ്യാറാക്കിയ അപേക്ഷയുമായി അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ എത്തി വിരലടയാളം നൽകുക.',
    nextAction_en: 'Visit your local Akshaya Centre with the application draft to record biometric.'
  });

  res.json({ success: true, draft });
});

// 7. Track Application
app.get('/api/tracking/:ref', (req, res) => {
  const ref = req.params.ref.trim();
  const found = applicationsDB.get(ref);

  if (!found) {
    // If not found in memory, return realistic simulated tracker based on reference pattern
    const simulated = {
      refNumber: ref,
      schemeName_ml: 'ഇന്ദിരാഗാന്ധി വാർദ്ധക്യകാല പെൻഷൻ',
      schemeName_en: 'Indira Gandhi Old Age Pension',
      applicantName: 'അപേക്ഷകൻ',
      status: 'UNDER_PROCESS',
      statusText_ml: 'ഫയൽ പരിശോധനയിൽ (തദ്ദേശ സ്വയംഭരണ വകുപ്പ്)',
      statusText_en: 'Verification Under Process at Local Body',
      timeline: [
        { date: '2026-10-20', step: 'അക്ഷയ കേന്ദ്രത്തിൽ അപേക്ഷ സമർപ്പിച്ചു (Submitted at Akshaya)', done: true },
        { date: '2026-10-28', step: 'രേഖകൾ പരിശോധിച്ചു (Documents Verified)', done: true },
        { date: '2026-11-05', step: 'വാർഡ് തല അന്വേഷണത്തിന് നിർദ്ദേശിച്ചു (Field Inquiry Ordered)', current: true },
        { date: 'TBD', step: 'കമ്മിറ്റി അന്തിമ അംഗീകാരം (Final Sanction)', pending: true }
      ],
      nextAction_ml: 'പഞ്ചായത്ത് വാർഡ് സെക്രട്ടറിയുടെ സന്ദർശനത്തിനായി കാത്തിരിക്കുക.',
      nextAction_en: 'Awaiting field visit by the local Panchayat Secretary.'
    };
    return res.json({ success: true, tracking: simulated });
  }

  res.json({ success: true, tracking: found });
});

// 8. Government Terms Jargon Buster
app.get('/api/terms', (req, res) => {
  res.json({ success: true, data: FREQUENT_GOVERNMENT_TERMS });
});

// 9. Helpline Directory
app.get('/api/helplines', (req, res) => {
  res.json({ success: true, data: HELPLINE_CONTACTS });
});

// ==========================================
// VOICEVAIDYA (വോയ്‌സ് വൈദ്യ) HEALTHCARE APIS
// ==========================================

// In-memory store for active medications & caregiver state
let currentMedications = [...INITIAL_MEDICATIONS];
let currentCaregiver = { ...CAREGIVER_PROFILE };

// 1. VoiceVaidya Chat & Symptom Understanding
app.post('/api/vaidya/chat', (req, res) => {
  const { message, language = 'ml' } = req.body;
  const text = (message || '').toLowerCase();

  // Emergency Symptom Check
  const isEmergency = 
    text.includes('നെഞ്ചുവേദന') || 
    text.includes('chest pain') || 
    text.includes('ശ്വാസംമുട്ടൽ') || 
    text.includes('breathless') || 
    text.includes('തളർന്നു');

  if (isEmergency) {
    return res.json({
      success: true,
      isEmergency: true,
      response_ml: "അടിയന്തിര മുന്നറിയിപ്പ്! നിങ്ങൾ പറഞ്ഞ ലക്ഷണങ്ങൾ ഗുരുതരമായേക്കാം. ഉടൻ 108 ആംബുലൻസിനെയോ 1056 ദിശ ഹെൽപ്‌ലൈനെയോ വിളിക്കുക.",
      response_en: "Emergency warning! Please contact 108 Ambulance or 1056 Disha immediately.",
      emergencyContacts: [
        { name: "Ambulance", number: "108" },
        { name: "Disha Health", number: "1056" }
      ]
    });
  }

  let reply_ml = "";
  let reply_en = "";

  if (text.includes('ബിപി') || text.includes('bp') || text.includes('ടെൽമിസാർട്ടൻ')) {
    reply_ml = "കുറിപ്പടി പ്രകാരം രക്തസമ്മർദ്ദത്തിനുള്ള ടെൽമിസാർട്ടൻ 40mg (Telmisartan) ദിവസവും രാവിലെ 8:00 മണിക്ക് പ്രഭാതഭക്ഷണത്തിന് ശേഷമാണ് കഴിക്കേണ്ടത്.";
    reply_en = "According to your prescription, Telmisartan 40mg for BP should be taken daily in the morning at 8:00 AM after breakfast.";
  } else if (text.includes('ഷുഗർ') || text.includes('sugar') || text.includes('മെറ്റ്ഫോർമിൻ')) {
    reply_ml = "പ്രമേഹത്തിനുള്ള മെറ്റ്ഫോർമിൻ 500mg (Metformin) ഗുളിക രാവിലെയും രാത്രിയും ഭക്ഷണത്തിന് ശേഷമാണ് കഴിക്കേണ്ടത്.";
    reply_en = "Metformin 500mg should be taken with or after breakfast and dinner.";
  } else if (text.includes('മറന്നു') || text.includes('missed')) {
    reply_ml = "മരുന്ന് കഴിക്കാൻ മറന്നുപോയാൽ ഓർമ്മ വരുമ്പോൾ തന്നെ കഴിക്കുക. എന്നാൽ അടുത്ത ഡോസിന് സമയമായിട്ടുണ്ടെങ്കിൽ ഒഴിവാക്കി അടുത്തത് മാത്രം കഴിക്കുക. ഒരിക്കലും രണ്ട് ഗുളിക ഒന്നിച്ച് കഴിക്കരുത്.";
    reply_en = "If you miss a dose, take it when you remember unless it is close to the next scheduled time. Never take two tablets together.";
  } else {
    reply_ml = "നിങ്ങളുടെ ചോദ്യം രേഖപ്പെടുത്തി. ഡോക്ടറുടെ കുറിപ്പടിയിലെ നിർദ്ദേശങ്ങൾ കൃത്യമായി പാലിക്കുക. സംശയമുണ്ടെങ്കിൽ ഫാർമസിസ്റ്റുമായി ബന്ധപ്പെടുക.";
    reply_en = "Follow your doctor prescription strictly and verify any uncertainties with your pharmacist.";
  }

  res.json({
    success: true,
    isEmergency: false,
    response_ml: reply_ml,
    response_en: reply_en
  });
});

// 2. Prescription OCR Analysis
app.post('/api/vaidya/prescriptions/analyze', (req, res) => {
  res.json({
    success: true,
    prescription: SAMPLE_PRESCRIPTIONS[0]
  });
});

// 3. Medication List & Status
app.get('/api/vaidya/medications', (req, res) => {
  res.json({
    success: true,
    count: currentMedications.length,
    data: currentMedications
  });
});

// 4. Log Medication Dose (Taken / Skipped)
app.post('/api/vaidya/medications/log', (req, res) => {
  const { id, status } = req.body;
  const med = currentMedications.find(m => m.id === id);
  if (med) {
    med.status = status;
    if (status === 'skipped' && currentCaregiver.permissions.missedDoseAlerts) {
      // Create caregiver alert
      currentCaregiver.recentAlerts.unshift({
        id: `alert-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        message_ml: `${med.name} എന്ന മരുന്ന് സമയത്ത് കഴിച്ചിട്ടില്ല എന്ന് രേഖപ്പെടുത്തി.`,
        status: "sent"
      });
    }
  }
  res.json({ success: true, updated: med });
});

// 5. Caregiver Info & Consent
app.get('/api/vaidya/caregivers', (req, res) => {
  res.json({ success: true, data: currentCaregiver });
});

app.post('/api/vaidya/caregivers/consent', (req, res) => {
  const { permissions } = req.body;
  currentCaregiver.permissions = { ...currentCaregiver.permissions, ...permissions };
  res.json({ success: true, data: currentCaregiver });
});

// 6. Medical History
app.get('/api/vaidya/medical-history', (req, res) => {
  res.json({ success: true, data: MEDICAL_HISTORY });
});

// Fallback to frontend index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Nammude Avakasham API Server listening on http://127.0.0.1:${PORT}`);
});
