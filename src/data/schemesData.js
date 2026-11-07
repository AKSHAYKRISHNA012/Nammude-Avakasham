export const SCHEMES = [
  {
    id: "ignaoap",
    name_ml: "ഇന്ദിരാഗാന്ധി ദേശീയ വാർദ്ധക്യകാല പെൻഷൻ (സേവന)",
    name_en: "Indira Gandhi National Old Age Pension (Sevana)",
    category: "senior",
    department_ml: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / സാമൂഹ്യ സുരക്ഷാ മിഷൻ",
    department_en: "Local Self Government Dept / Social Security",
    target_group_ml: "60 വയസ്സിന് മുകളിൽ പ്രായമുള്ള മുതിർന്ന പൗരന്മാർ",
    target_group_en: "Senior Citizens aged 60 years and above",
    benefit_ml: "പ്രതിമാസം ₹1,600 വീതം ബാങ്ക് അക്കൗണ്ടിലോ സഹകരണ ബാങ്ക് വഴി നേരിട്ടോ ലഭിക്കുന്നു.",
    benefit_en: "₹1,600 per month credited directly to bank account or doorstep co-op bank delivery.",
    monthly_amount: 1600,
    min_age: 60,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "അപേക്ഷകന് 60 വയസ്സോ അതിൽ കൂടുതലോ പ്രായമുണ്ടായിരിക്കണം.",
      "കഴിഞ്ഞ 2 വർഷമായി കേരളത്തിൽ സ്ഥിരതാമസക്കാരനായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത് (BPL മുൻഗണനാ റേഷൻ കാർഡ് ഉള്ളവർക്ക് മുൻഗണന).",
      "മറ്റ് സർക്കാർ/കേന്ദ്ര പെൻഷനുകളോ സർവീസ് പെൻഷനുകളോ വാങ്ങുന്നവരായിരിക്കരുത്.",
      "യാചകവൃത്തിയിൽ ഏർപ്പെടുന്നവരോ വൃദ്ധസദനത്തിൽ സൗജന്യമായി താമസിക്കുന്നവരോ ആകരുത്."
    ],
    eligibility_en: [
      "Applicant must be 60 years of age or older.",
      "Permanent resident of Kerala for the past 2 years.",
      "Annual family income must not exceed ₹1,00,000 (Priority BPL cards preferred).",
      "Must not be drawing any other statutory or government service pension.",
      "Must not reside in free government-aided old age homes."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ് (Aadhaar Card)",
      "റേഷൻ കാർഡ് (മുൻഗണനാ/BPL കാർഡ് ഉണ്ടെങ്കിൽ)",
      "പ്രായം തെളിയിക്കുന്ന രേഖ (സ്കൂൾ സർട്ടിഫിക്കറ്റ് / വോട്ടർ ഐഡി / ജനന സർട്ടിഫിക്കറ്റ്)",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റ് (റേഷൻ കാർഡ് മുൻഗണനാ വിഭാഗമല്ലെങ്കിൽ)",
      "ബാങ്ക് പാസ്സ്ബുക്കിന്റെ പകർപ്പ് (IFSC കോഡ് വ്യക്തമായത്)"
    ],
    required_documents_en: [
      "Aadhaar Card",
      "Ration Card (Yellow/Pink priority cards preferred)",
      "Age Proof (Voter ID / School Certificate / Birth Certificate)",
      "Income Certificate from Village Officer (if non-priority ration card)",
      "Bank Passbook copy with clear IFSC code"
    ],
    procedure_ml: [
      "ഘട്ടം 1: ആവശ്യമായ രേഖകൾ സഹിതം Akshaya കേന്ദ്രം വഴിയോ 'സേവന' പോർട്ടൽ വഴിയോ ഓൺലൈനായി അപേക്ഷിക്കുക.",
      "ഘട്ടം 2: അപേക്ഷയുടെ പകർപ്പും രേഖകളും ഗ്രാമപഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി ഓഫീസിൽ സമർപ്പിക്കുക.",
      "ഘട്ടം 3: വാർഡ് മെമ്പർ/കൗൺസിലറുടെ ശുപാർശയും പഞ്ചായത്ത് സെക്രട്ടറിയുടെ ഫീൽഡ് പരിശോധനയും.",
      "ഘട്ടം 4: അംഗീകാരം ലഭിച്ചാൽ തൊട്ടടുത്ത മാസം മുതൽ പെൻഷൻ ലഭിച്ചുതുടങ്ങും.",
      "ശ്രദ്ധിക്കുക: എല്ലാ വർഷവും നവംബർ മാസത്തിൽ അക്ഷയ കേന്ദ്രം വഴി നിർബന്ധിത വാർഷിക മസ്റ്ററിംഗ് (ബയോമെട്രിക്) നടത്തണം."
    ],
    procedure_en: [
      "Step 1: Submit online application via nearest Akshaya Centre or Sevana portal.",
      "Step 2: Submit physical application printout with documents to Grama Panchayat / Municipality.",
      "Step 3: Verification by Ward Member/Councilor & Panchayat Secretary field enquiry.",
      "Step 4: Once sanctioned, monthly pension starts directly to bank account.",
      "Note: Mandatory annual biometric mustering at Akshaya Centre every November."
    ],
    official_link: "https://welfarepension.lsgkerala.gov.in/",
    source_reference: "Kerala Sevana Pension Rules & LSGD Govt Order 2026",
    last_verified: "October 2026",
    human_assistance_required: "അക്ഷയ കേന്ദ്രം വഴി ബയോമെട്രിക് വെരിഫിക്കേഷനും പഞ്ചായത്ത് സെക്രട്ടറിയുടെ ഫീൽഡ് ഇൻസ്പെക്ഷനും നിർബന്ധമാണ്."
  },
  {
    id: "disability_pension",
    name_ml: "പ്രത്യേക ഭിന്നശേഷി പെൻഷൻ / വികലാംഗ പെൻഷൻ (സേവന)",
    name_en: "Differently Abled Welfare Pension (Sevana)",
    category: "pwd",
    department_ml: "സാമൂഹ്യനീതി വകുപ്പ് / തദ്ദേശ സ്വയംഭരണ വകുപ്പ്",
    department_en: "Social Justice Dept / LSGD Kerala",
    target_group_ml: "40 ശതമാനമോ അതിൽ കൂടുതലോ വൈകല്യമുള്ള ഭിന്നശേഷിക്കാർ",
    target_group_en: "Persons with benchmark disabilities of 40% and above",
    benefit_ml: "പ്രതിമാസം ₹1,600 (ഗുരുതര വൈകല്യമുള്ളവർക്ക് പ്രത്യേക നിരക്കിൽ ₹2,200 വരെ).",
    benefit_en: "₹1,600 per month (up to ₹2,200 for severe mental/multiple disabilities).",
    monthly_amount: 1600,
    min_age: 0,
    max_income: 100000,
    requires_disability: true,
    min_disability_pct: 40,
    eligibility_ml: [
      "അംഗീകൃത മെഡിക്കൽ ബോർഡിൽ നിന്നുള്ള 40% അല്ലെങ്കിൽ അതിൽ കൂടുതൽ വൈകല്യ സർട്ടിഫിക്കറ്റ് ഉണ്ടായിരിക്കണം.",
      "കേരളത്തിൽ സ്ഥിരതാമസക്കാരനായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത്.",
      "കേന്ദ്ര/സംസ്ഥാന സർക്കാർ സർവീസിലോ പൊതുമേഖലാ സ്ഥാപനങ്ങളിലോ സ്ഥിരം ജീവനക്കാരനായിരിക്കരുത്.",
      "പ്രായപരിധിയില്ല (കുട്ടികൾക്കും ബാധകം)."
    ],
    eligibility_en: [
      "Must possess Medical Board Certificate certifying 40% or higher permanent disability.",
      "Must be a permanent resident of Kerala.",
      "Annual family income must not exceed ₹1,00,000.",
      "Not employed in permanent government or public sector service.",
      "No age limit (applicable from infancy)."
    ],
    required_documents_ml: [
      "മെഡിക്കൽ ബോർഡ് നൽകിയ ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് (Disability Certificate)",
      "സ്വാവലംബൻ കാർഡ് (UDID Card - ഉണ്ടെങ്കിൽ)",
      "ആധാർ കാർഡ്",
      "റേഷൻ കാർഡ് പകർപ്പ്",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റ്",
      "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ് & പാസ്പോർട്ട് സൈസ് ഫോട്ടോ"
    ],
    required_documents_en: [
      "Medical Board Disability Certificate (stating 40%+ disability)",
      "UDID / Swavlamban Card (if issued)",
      "Aadhaar Card",
      "Ration Card copy",
      "Income Certificate from Village Office",
      "Bank passbook & recent passport photograph"
    ],
    procedure_ml: [
      "ഘട്ടം 1: താലൂക്ക്/ജില്ലാ ആശുപത്രി മെഡിക്കൽ ബോർഡിൽ നിന്ന് വൈകല്യ ശതമാനം വ്യക്തമാക്കുന്ന സർട്ടിഫിക്കറ്റ് നേടുക.",
      "ഘട്ടം 2: അക്ഷയ കേന്ദ്രം വഴി സേവന പോർട്ടലിൽ അപേക്ഷ സമർപ്പിക്കുക.",
      "ഘട്ടം 3: അപേക്ഷാ ഫോറം തദ്ദേശ സ്ഥാപനത്തിൽ (പഞ്ചായത്ത്/നഗരസഭ) രേഖകൾ സഹിതം ഏൽപ്പിക്കുക.",
      "ഘട്ടം 4: അംഗീകാരം ലഭിച്ച ശേഷം ഗുണഭോക്താവിന്റെ ബാങ്ക് അക്കൗണ്ടിലേക്ക് തുക നേരിട്ടെത്തും."
    ],
    procedure_en: [
      "Step 1: Obtain Disability Certificate from Taluk/District Hospital Medical Board.",
      "Step 2: Submit online application at Akshaya Centre via Sevana portal.",
      "Step 3: Submit hard copy with medical proofs to local body (Panchayat/Municipality).",
      "Step 4: After sanction, amount is disbursed directly to beneficiary account."
    ],
    official_link: "https://welfarepension.lsgkerala.gov.in/",
    source_reference: "Kerala Social Security Differently Abled Rules 2026",
    last_verified: "October 2026",
    human_assistance_required: "മെഡിക്കൽ ബോർഡിന്റെ ശാരീരിക പരിശോധനയും അക്ഷയ കേന്ദ്രം വഴിയുള്ള അപേക്ഷയും നിർബന്ധമാണ്."
  },
  {
    id: "aswasakiranam",
    name_ml: "ആശ്വാസകിരണം പദ്ധതി (സാമൂഹ്യ സുരക്ഷാ മിഷൻ)",
    name_en: "Aswasakiranam Scheme (KSSM)",
    category: "caregiver",
    department_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    department_en: "Kerala Social Security Mission",
    target_group_ml: "പൂർണ്ണമായും കിടപ്പിലായ രോഗികളെ പരിചരിക്കുന്ന കുടുംബാംഗങ്ങൾ / പരിചാരകർ",
    target_group_en: "Caregivers of fully bedridden patients & severe disabilities",
    benefit_ml: "പരിചാരകന് മാസം തോറും ₹600 ധനസഹായം ലഭിക്കുന്നു.",
    benefit_en: "₹600 monthly allowance for full-time caregiver.",
    monthly_amount: 600,
    min_age: 0,
    max_income: 100000,
    requires_disability: true,
    min_disability_pct: 70,
    eligibility_ml: [
      "രോഗി പൂർണ്ണമായും കിടപ്പിലായ അവസ്ഥയിലോ 100% പരസഹായം ആവശ്യമുള്ളവരോ ആയിരിക്കണം.",
      "മാനസിക വെല്ലുവിളി, ഓട്ടിസം, സെറിബ്രൽ പാൾസി, അൽഷിമേഴ്സ് തുടങ്ങിയ അവസ്ഥകളുള്ളവർ.",
      "പരിചാരകൻ മറ്റ് ജോലികൾക്ക് പോകാൻ കഴിയാത്ത വിധം രോഗിയെ പരിചരിക്കുന്ന വ്യക്തിയായിരിക്കണം.",
      "BPL കുടുംബങ്ങൾക്ക് അല്ലെങ്കിൽ വാർഷിക വരുമാനം ₹1 ലക്ഷത്തിന് താഴെയുള്ളവർക്ക് അർഹത."
    ],
    eligibility_en: [
      "Patient must be completely bedridden or totally dependent on care.",
      "Severe mental challenge, autism, cerebral palsy, or advanced Alzheimer's.",
      "Caregiver must be a direct family member unable to pursue outside employment.",
      "BPL family status or annual family income below ₹1,00,000."
    ],
    required_documents_ml: [
      "സർക്കാർ അസിസ്റ്റന്റ് സർജനിൽ കുറയാത്ത ഡോക്ടറുടെ മെഡിക്കൽ സർട്ടിഫിക്കറ്റ്",
      "രോഗിയുടെയും പരിചാരകന്റെയും ആധാർ കാർഡുകൾ",
      "റേഷൻ കാർഡ് (BPL/മുൻഗണനാ കാർഡ്)",
      "പരിചാരകന്റെ ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്",
      "രോഗിയെ പരിചരിക്കുന്നതിൻ്റെ ഫോട്ടോ"
    ],
    required_documents_en: [
      "Medical Certificate by Govt Assistant Surgeon / Specialist",
      "Aadhaar cards of both patient and caregiver",
      "Ration Card copy",
      "Caregiver bank account passbook",
      "Photograph showing caregiver assisting patient"
    ],
    procedure_ml: [
      "ഘട്ടം 1: ഡോക്ടറിൽ നിന്നും നിശ്ചിത മാതൃകയിലുള്ള മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് വാങ്ങുക.",
      "ഘട്ടം 2: അപേക്ഷാ ഫോറം പൂരിപ്പിച്ച് ഐ.സി.ഡി.എസ് (ICDS) സൂപ്പർവൈസർ വഴിയോ അക്ഷയ വഴിയോ സമർപ്പിക്കുക.",
      "ഘട്ടം 3: അങ്കണവാടി വർക്കറുടെ സ്ഥല പരിശോധന.",
      "ഘട്ടം 4: സാമൂഹ്യ സുരക്ഷാ മിഷൻ ഡയറക്ടർ അംഗീകാരം നൽകുന്നു."
    ],
    procedure_en: [
      "Step 1: Get structured medical certificate signed by Govt Assistant Surgeon.",
      "Step 2: Submit application via ICDS Supervisor or Akshaya Centre.",
      "Step 3: Physical home verification by local Anganwadi worker.",
      "Step 4: Sanction order issued by Director of Kerala Social Security Mission."
    ],
    official_link: "https://kssm.ikm.in/",
    source_reference: "Kerala Social Security Mission Guidelines 2026",
    last_verified: "October 2026",
    human_assistance_required: "സർക്കാർ ഡോക്ടറുടെ സർട്ടിഫിക്കറ്റും അങ്കണവാടി വർക്കറുടെ ഭവന സന്ദർശന പരിശോധനയും ആവശ്യമാണ്."
  },
  {
    id: "vayomithram",
    name_ml: "വയോമിത്രം പദ്ധതി (മുതിർന്ന പൗരന്മാർക്കുള്ള സൗജന്യ ആരോഗ്യ സേവനം)",
    name_en: "Vayomithram Project (Geriatric Mobile Health Care)",
    category: "senior",
    department_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    department_en: "Kerala Social Security Mission",
    target_group_ml: "നഗരസഭാ പരിധിയിലെ 65 വയസ്സിന് മുകളിലുള്ള മുതിർന്ന പൗരന്മാർ",
    target_group_en: "Senior Citizens aged 65+ in Kerala Municipalities & Corporations",
    benefit_ml: "സൗജന്യ ഡോക്ടർ പരിശോധന, മരുന്നുകൾ, മൊബൈൽ ക്ലിനിക്ക്, സാന്ത്വന പരിചരണം.",
    benefit_en: "Free medical consultation, free geriatric medicines, mobile clinics, palliative care.",
    monthly_amount: 0,
    min_age: 65,
    max_income: 9999999,
    requires_disability: false,
    eligibility_ml: [
      "അപേക്ഷകന് 65 വയസ്സ് തികഞ്ഞിരിക്കണം.",
      "പദ്ധതി നിലവിലുള്ള കോർപ്പറേഷൻ അല്ലെങ്കിൽ മുനിസിപ്പാലിറ്റി പരിധിയിലെ താമസക്കാരനായിരിക്കണം.",
      "മൊബൈൽ ക്ലിനിക്ക് പരിശോധനകൾക്കും മരുന്നുകൾക്കും വരുമാന പരിധിയില്ല (എല്ലാവർക്കും സൗജന്യം)."
    ],
    eligibility_en: [
      "Applicant must be at least 65 years old.",
      "Must reside within covered Kerala Municipality or Municipal Corporation limits.",
      "No income limit for mobile clinic checks and free essential medications."
    ],
    required_documents_ml: [
      "പ്രായം തെളിയിക്കുന്ന രേഖ / ആധാർ കാർഡ്",
      "നഗരസഭാ പരിധിയിലെ താമസരേഖ",
      "നിലവിൽ കഴിക്കുന്ന മരുന്നുകളുടെ പ്രിസ്ക്രിപ്ഷൻ (ഉണ്ടെങ്കിൽ)"
    ],
    required_documents_en: [
      "Aadhaar Card / Age proof",
      "Proof of residence in urban local body",
      "Existing medical prescription (if any)"
    ],
    procedure_ml: [
      "ഘട്ടം 1: തങ്ങളുടെ വാർഡിൽ മൊബൈൽ ക്ലിനിക്ക് എത്തുന്ന ദിവസം അറിയുക (റസിഡൻസ് അസോസിയേഷൻ അല്ലെങ്കിൽ കൗൺസിലർ വഴി).",
      "ഘട്ടം 2: ആധാർ കാർഡുമായി എത്തി വയോമിത്രം ക്ലിനിക്കിൽ രജിസ്റ്റർ ചെയ്യുക.",
      "ഘട്ടം 3: ഡോക്ടർ പരിശോധനക്ക് ശേഷം രക്തസമ്മർദ്ദം, പ്രമേഹം തുടങ്ങിയ ജീവിതശൈലീ രോഗങ്ങൾക്കുള്ള മരുന്നുകൾ സൗജന്യമായി കൈപ്പറ്റുക."
    ],
    procedure_en: [
      "Step 1: Check mobile clinic visit schedule in your ward.",
      "Step 2: Carry Aadhaar card and register directly at the Vayomithram camp site.",
      "Step 3: Undergo health checkup and collect monthly prescribed geriatric medicines free."
    ],
    official_link: "https://kssm.ikm.in/",
    source_reference: "Kerala Social Security Mission Vayomithram Norms 2026",
    last_verified: "October 2026",
    human_assistance_required: "ക്ലിനിക്ക് ക്യാമ്പിൽ നേരിട്ട് ഹാജരായി ഡോക്ടറുടെ ശാരീരിക പരിശോധന ആവശ്യമാണ്."
  },
  {
    id: "udid_card",
    name_ml: "സ്വാവലംബൻ കാർഡ് / ഏകീകൃത ഭിന്നശേഷി തിരിച്ചറിയൽ കാർഡ് (UDID)",
    name_en: "Unique Disability ID (UDID) Card",
    category: "pwd",
    department_ml: "കേന്ദ്ര സാമൂഹ്യനീതി & ശാക്തീകരണ മന്ത്രാലയം / കേരള സാമൂഹ്യനീതി വകുപ്പ്",
    department_en: "Dept of Empowerment of Persons with Disabilities, Govt of India & Kerala",
    target_group_ml: "എല്ലാ വിഭാഗങ്ങളിലുംപെട്ട ഭിന്നശേഷിക്കാർ",
    target_group_en: "All persons with benchmark disabilities under RPwD Act 2016",
    benefit_ml: "ദേശീയതലത്തിൽ ഒരൊറ്റ കാർഡ്, KSRTC ബസ് യാത്ര ഇളവ്, ട്രെയിൻ ടിക്കറ്റ് ഇളവ്, സൗജന്യ ഉപകരണങ്ങൾ.",
    benefit_en: "National unified ID card, KSRTC concessional/free travel, rail concessions, free assistive aids.",
    monthly_amount: 0,
    min_age: 0,
    max_income: 9999999,
    requires_disability: true,
    min_disability_pct: 40,
    eligibility_ml: [
      "RPwD ആക്ട് 2016 പ്രകാരം അംഗീകരിക്കപ്പെട്ട 21 ഇനം വൈകല്യങ്ങളിൽ ഏതെങ്കിലും ഉള്ള വ്യക്തി.",
      "വൈകല്യത്തിന്റെ അളവ് 40 ശതമാനമോ അതിൽ കൂടുതലോ ആയിരിക്കണം.",
      "വരുമാന പരിധിയില്ല."
    ],
    eligibility_en: [
      "Persons with any of the 21 benchmark disabilities recognized under RPwD Act 2016.",
      "Permanent disability percentage of 40% or above.",
      "No income ceiling."
    ],
    required_documents_ml: [
      "മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റ് (Medical Certificate)",
      "ആധാർ കാർഡ്",
      "പാസ്പോർട്ട് സൈസ് ഫോട്ടോ",
      "ഒപ്പ് അല്ലെങ്കിൽ വിരലടയാളം"
    ],
    required_documents_en: [
      "Hospital Medical Board Certificate",
      "Aadhaar Card",
      "Passport size colour photograph",
      "Signature or thumb impression"
    ],
    procedure_ml: [
      "ഘട്ടം 1: www.swavlambancard.gov.in പോർട്ടലിൽ ഓൺലൈനായി അപേക്ഷിക്കുക (അക്ഷയ വഴി സാധ്യമാണ്).",
      "ഘട്ടം 2: ജില്ലാ/താലൂക്ക് ആശുപത്രിയിലെ മെഡിക്കൽ അസ്സസ്സ്മെന്റ് തീയതി ലഭിക്കും.",
      "ഘട്ടം 3: പരിശോധനക്ക് ശേഷം സർട്ടിഫിക്കറ്റും UDID കാർഡും തപാലിൽ വീട്ടിലെത്തും, ഓൺലൈനായും ഡൗൺലോഡ് ചെയ്യാം."
    ],
    procedure_en: [
      "Step 1: Register online via swavlambancard.gov.in portal or Akshaya Centre.",
      "Step 2: Get appointment date for hospital assessment board.",
      "Step 3: Verification completed; UDID smart card delivered to residential address."
    ],
    official_link: "https://www.swavlambancard.gov.in/",
    source_reference: "Ministry of Social Justice & Empowerment, Govt of India",
    last_verified: "October 2026",
    human_assistance_required: "മെഡിക്കൽ ബോർഡിന് മുന്നിൽ നേരിട്ടുള്ള വിലയിരുത്തൽ നിർബന്ധമാണ്."
  },
  {
    id: "kasp_health",
    name_ml: "കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി (KASP / ആയുഷ്മാൻ ഭാരത്)",
    name_en: "Karunya Arogya Suraksha Padhathi (KASP)",
    category: "health",
    department_ml: "സ്റ്റേറ്റ് ഹെൽത്ത് ഏജൻസി (SHA), ആരോഗ്യ വകുപ്പ് കേരളം",
    department_en: "State Health Agency, Health Dept Kerala",
    target_group_ml: "സാമ്പത്തികമായി പിന്നോക്കം നിൽക്കുന്ന കുടുംബങ്ങൾ, മുതിർന്നവർ, ഭിന്നശേഷിക്കാർ",
    target_group_en: "Vulnerable families, Senior Citizens, and PwD with priority ration cards",
    benefit_ml: "ഒരു കുടുംബത്തിന് പ്രതിവർഷം ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ ചികിത്സാ പരിരക്ഷ.",
    benefit_en: "Free secondary & tertiary healthcare cover up to ₹5 Lakhs per family per year.",
    monthly_amount: 0,
    min_age: 0,
    max_income: 150000,
    requires_disability: false,
    eligibility_ml: [
      "NFSA പ്രകാരമുള്ള മുൻഗണനാ റേഷൻ കാർഡ് (മഞ്ഞ അല്ലെങ്കിൽ പിങ്ക് കാർഡ്) ഉടമകൾ.",
      "മുൻ കാരുണ്യ ബെനവലന്റ് ഫണ്ട് ഗുണഭോക്താക്കൾ.",
      "കുടുംബത്തിലെ അംഗങ്ങളുടെ എണ്ണത്തിനോ പ്രായത്തിനോ പരിധിയില്ല."
    ],
    eligibility_en: [
      "Priority ration cardholders (Yellow AAY or Pink PHH cards).",
      "Eligible families enrolled in State Health Agency database.",
      "No restriction on family size or age."
    ],
    required_documents_ml: [
      "റേഷൻ കാർഡ് (മഞ്ഞ അല്ലെങ്കിൽ പിങ്ക്)",
      "ചികിത്സ ആവശ്യമുള്ള വ്യക്തിയുടെ ആധാർ കാർഡ്",
      "രോഗനിർണ്ണയ രേഖകൾ (ഹോസ്പിറ്റൽ രേഖകൾ)"
    ],
    required_documents_en: [
      "Ration Card (Yellow or Pink priority card)",
      "Aadhaar card of patient",
      "Hospital diagnosis / admission papers"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അംഗീകൃത സർക്കാർ അല്ലെങ്കിൽ സ്വകാര്യ എംപാനൽഡ് ആശുപത്രിയിലെ KASP കിയോസ്കിൽ എത്തുക.",
      "ഘട്ടം 2: റേഷൻ കാർഡും ആധാർ കാർഡും സമർപ്പിക്കുക.",
      "ഘട്ടം 3: 'ആരോഗ്യമിത്ര' (Arogyamithra) രേഖകൾ പരിശോധിച്ച് പ്രീ-ഓതറൈസേഷൻ നൽകും.",
      "ഘട്ടം 4: പണരഹിത ചികിത്സ (Cashless Treatment) പൂർണ്ണമായും സൗജന്യമായി ലഭ്യമാകും."
    ],
    procedure_en: [
      "Step 1: Visit KASP helpdesk kiosk at any empanelled hospital in Kerala.",
      "Step 2: Produce original Ration Card and Aadhaar.",
      "Step 3: 'Arogyamithra' executive verifies eligibility and triggers pre-authorization.",
      "Step 4: Avail 100% cashless treatment up to ₹5,00,000 ceiling."
    ],
    official_link: "https://sha.kerala.gov.in/",
    source_reference: "State Health Agency Kerala KASP Portal 2026",
    last_verified: "October 2026",
    human_assistance_required: "ആശുപത്രിയിലെ ആരോഗ്യമിത്ര കിയോസ്കിൽ ബയോമെട്രിക്/ആധാർ ഒ.ടി.പി നിർബന്ധമാണ്."
  }
];

export const FREQUENT_GOVERNMENT_TERMS = [
  {
    term_en: "BPL Ration Card (Yellow / Pink)",
    term_ml: "ബി.പി.എൽ റേഷൻ കാർഡ് (മഞ്ഞ / പിങ്ക്)",
    simple_explanation_ml: "ദാരിദ്ര്യരേഖയ്ക്ക് താഴെയുള്ള കുടുംബങ്ങൾക്കുള്ള കാർഡുകൾ. മഞ്ഞ കാർഡ് (AAY) ഏറ്റവും അർഹരായവർക്കും, പിങ്ക് കാർഡ് (PHH) മുൻഗണനാ വിഭാഗങ്ങൾക്കുമുള്ളതാണ്. സർക്കാർ പെൻഷനുകൾക്ക് ഇത് വലിയ മുൻഗണന നൽകുന്നു.",
    simple_explanation_en: "Below Poverty Line cards. Yellow is Antyodaya (poorest), Pink is Priority Household. Grants priority for pensions."
  },
  {
    term_en: "Annual Biometric Mustering",
    term_ml: "വാർഷിക മസ്റ്ററിംഗ് (ബയോമെട്രിക് ജീവൻ രേഖ)",
    simple_explanation_ml: "പെൻഷൻ വാങ്ങുന്നയാൾ ജീവിച്ചിരിപ്പുണ്ടെന്ന് ഉറപ്പുവരുത്താൻ എല്ലാ വർഷവും അക്ഷയ കേന്ദ്രത്തിൽ വിരലടയാളം അല്ലെങ്കിൽ കൃഷ്ണമണി (Iris) സ്കാൻ ചെയ്ത് നൽകുന്ന നടപടിയാണിത്.",
    simple_explanation_en: "Annual life-certificate verification done at Akshaya Centre via fingerprint or iris scan to continue monthly pension."
  },
  {
    term_en: "Medical Board Certificate",
    term_ml: "മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റ്",
    simple_explanation_ml: "താലൂക്ക് അല്ലെങ്കിൽ ജില്ലാ ആശുപത്രിയിലെ ഡോക്ടർമാരുടെ സംഘം പരിശോധിച്ച് ഒരു വ്യക്തിക്ക് എത്ര ശതമാനം വൈകല്യമുണ്ടെന്ന് രേഖപ്പെടുത്തി നൽകുന്ന ഔദ്യോഗിക സർട്ടിഫിക്കറ്റ് (40 ശതമാനമെങ്കിലും വേണം).",
    simple_explanation_en: "Official certificate issued by panel of govt doctors stating disability percentage (minimum 40% required for benefits)."
  },
  {
    term_en: "Income Certificate (വരുമാന സർട്ടിഫിക്കറ്റ്)",
    term_ml: "വില്ലേജ് വരുമാന സർട്ടിഫിക്കറ്റ്",
    simple_explanation_ml: "കുടുംബത്തിന്റെ വാർഷിക വരുമാനം എത്രയാണെന്ന് കാണിച്ച് വില്ലേജ് ഓഫീസർ നൽകുന്ന സർട്ടിഫിക്കറ്റ്. വെബ്സൈറ്റിലൂടെയോ അക്ഷയ വഴിയോ അപേക്ഷിക്കാം.",
    simple_explanation_en: "Official certificate issued by Village Officer verifying household annual income."
  },
  {
    term_en: "Aadhaar Seeding / NPCI Mapping",
    term_ml: "ആധാർ ബാങ്ക് ലിങ്കിംഗ് (NPCI മാപ്പിംഗ്)",
    simple_explanation_ml: "സർക്കാർ പെൻഷൻ തുക തടസ്സമില്ലാതെ നേരിട്ട് ബാങ്കിൽ എത്താൻ ബാങ്ക് അക്കൗണ്ടുമായി ആധാർ നമ്പർ ബന്ധിപ്പിക്കുന്ന രീതി.",
    simple_explanation_en: "Linking Aadhaar with your bank account so government benefits arrive directly without delays."
  }
];

export const HELPLINE_CONTACTS = [
  {
    name_ml: "മുതിർന്ന പൗരന്മാർക്കുള്ള ദേശീയ ഹെൽപ്‌ലൈൻ (Elder Line)",
    name_en: "National Helpline for Senior Citizens (Elder Line)",
    number: "14567",
    toll_free: true,
    timing_ml: "രാവിലെ 8 മണി മുതൽ രാത്രി 8 മണി വരെ",
    timing_en: "8:00 AM to 8:00 PM"
  },
  {
    name_ml: "ദിശ ആരോഗ്യ ഹെൽപ്‌ലൈൻ (Disha Kerala)",
    name_en: "Disha Health Helpline Kerala",
    number: "1056",
    toll_free: true,
    timing_ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്നു",
    timing_en: "24x7 Available"
  },
  {
    name_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    name_en: "Kerala Social Security Mission",
    number: "1800 120 1001",
    toll_free: true,
    timing_ml: "ഓഫീസ് സമയങ്ങളിൽ (രാവിലെ 10 മുതൽ വൈകിട്ട് 5 വരെ)",
    timing_en: "Office hours (10:00 AM - 5:00 PM)"
  },
  {
    name_ml: "അക്ഷയ സഹായ കേന്ദ്രം (Akshaya e-Kendra Helpdesk)",
    name_en: "Akshaya State Helpdesk",
    number: "0471 2525444",
    toll_free: false,
    timing_ml: "ഓഫീസ് പ്രവൃത്തി ദിവസങ്ങളിൽ",
    timing_en: "Working days"
  }
];
