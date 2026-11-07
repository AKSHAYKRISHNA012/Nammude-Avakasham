// Authoritative Kerala & Central Government Welfare Schemes Directory
// Verified against official portals:
// 1. Local Self Government Department (LSGD) Sevana: https://welfarepension.lsgkerala.gov.in/
// 2. Kerala Social Security Mission (KSSM): http://socialsecuritymission.gov.in/
// 3. Department of Empowerment of Persons with Disabilities (UDID): https://www.swavlambancard.gov.in/
// 4. State Health Agency (SHA Kerala) Karunya KASP: https://sha.kerala.gov.in/
// 5. Directorate of Social Justice Kerala: http://swd.kerala.gov.in/
// Last verified: November 2026

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
    benefit_ml: "പ്രതിമാസം ₹1,600 വീതം ബാങ്ക് അക്കൗണ്ടിലോ സഹകരണ ബാങ്ക് വഴി വീട്ടിലെത്തിച്ചോ ലഭിക്കുന്നു.",
    benefit_en: "₹1,600 per month credited directly to bank account or doorstep co-op bank delivery.",
    monthly_amount: 1600,
    min_age: 60,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "അപേക്ഷകന് 60 വയസ്സോ അതിൽ കൂടുതലോ പ്രായമുണ്ടായിരിക്കണം.",
      "കഴിഞ്ഞ 2 വർഷമായി കേരളത്തിൽ സ്ഥിരതാമസക്കാരനായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത് (BPL / മുൻഗണനാ റേഷൻ കാർഡ് ഉള്ളവർക്ക് മുൻഗണന).",
      "മറ്റ് സർക്കാർ/കേന്ദ്ര സർവീസ് പെൻഷനുകളോ ഇ.പി.എഫ് പെൻഷനോ വാങ്ങുന്നവരായിരിക്കരുത്.",
      "യാചകവൃത്തിയിൽ ഏർപ്പെടുന്നവരോ സർക്കാർ സഹായത്തോടെയുള്ള വൃദ്ധസദനത്തിൽ സൗജന്യമായി താമസിക്കുന്നവരോ ആകരുത്."
    ],
    eligibility_en: [
      "Applicant must be 60 years of age or older.",
      "Permanent resident of Kerala for the past 2 continuous years.",
      "Annual family income must not exceed ₹1,00,000 (Priority BPL cards preferred).",
      "Must not be drawing any statutory service pension or higher EPF pension.",
      "Must not reside in free government-aided old age homes."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ് (Aadhaar Card)",
      "റേഷൻ കാർഡ് (മഞ്ഞ അല്ലെങ്കിൽ പിങ്ക് മുൻഗണനാ കാർഡ് ഉണ്ടെങ്കിൽ)",
      "പ്രായം തെളിയിക്കുന്ന രേഖ (സ്കൂൾ സർട്ടിഫിക്കറ്റ് / വോട്ടർ ഐഡി / ജനന സർട്ടിഫിക്കറ്റ്)",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റ് (വെള്ള/നീല കാർഡുകാർക്ക്)",
      "ബാങ്ക് പാസ്സ്ബുക്കിന്റെ പകർപ്പ് (IFSC കോഡും ആധാർ ലിങ്കിംഗും ഉള്ളത്)"
    ],
    required_documents_en: [
      "Aadhaar Card",
      "Ration Card (Yellow/Pink priority cards preferred)",
      "Age Proof (Voter ID / School Certificate / Birth Certificate)",
      "Income Certificate from Village Officer (if non-priority ration card)",
      "Bank Passbook copy with clear IFSC code & NPCI mapping"
    ],
    procedure_ml: [
      "ഘട്ടം 1: ആവശ്യമായ രേഖകൾ സഹിതം Akshaya കേന്ദ്രം വഴിയോ 'സേവന' പോർട്ടൽ വഴിയോ ഓൺലൈനായി അപേക്ഷിക്കുക.",
      "ഘട്ടം 2: അപേക്ഷയുടെ പകർപ്പും രേഖകളും ഗ്രാമപഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി ഓഫീസിൽ സമർപ്പിക്കുക.",
      "ഘട്ടം 3: വാർഡ് മെമ്പർ/കൗൺസിലറുടെ ശുപാർശയും പഞ്ചായത്ത് സെക്രട്ടറിയുടെ ഫീൽഡ് പരിശോധനയും.",
      "ഘട്ടം 4: അംഗീകാരം ലഭിച്ചാൽ തൊട്ടടുത്ത മാസം മുതൽ പെൻഷൻ അക്കൗണ്ടിലെത്തും.",
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
    source_reference: "Kerala Sevana Pension Rules & LSGD Govt Orders",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
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
      "പ്രായപരിധിയില്ല (കുട്ടികൾക്കും അർഹതയുണ്ട്)."
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
    source_reference: "Kerala Sevana Disability Pension Rules & RPwD Act 2016",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "മെഡിക്കൽ ബോർഡ് പരിശോധനയും അക്ഷയ ബയോമെട്രിക് മസ്റ്ററിംഗും നിർബന്ധമാണ്."
  },
  {
    id: "aswasakiranam",
    name_ml: "ആശ്വാസകിരണം പദ്ധതി (സാമൂഹ്യ സുരക്ഷാ മിഷൻ)",
    name_en: "Aswasakiranam Scheme (KSSM)",
    category: "caregiver",
    department_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    department_en: "Kerala Social Security Mission",
    target_group_ml: "പൂർണ്ണമായും കിടപ്പിലായ രോഗികളെയും ഭിന്നശേഷിക്കാരെയും പരിചരിക്കുന്നവർ",
    target_group_en: "Caregivers of fully bedridden patients and severe PwD",
    benefit_ml: "പ്രതിമാസം ₹600 വീതം രോഗിയുടെ പരിചാരകന്റെ ബാങ്ക് അക്കൗണ്ടിലേക്ക് ലഭിക്കുന്നു.",
    benefit_en: "₹600 per month financial aid to the primary caregiver.",
    monthly_amount: 600,
    min_age: 0,
    max_income: 100000,
    requires_disability: true,
    min_disability_pct: 60,
    eligibility_ml: [
      "രോഗി പൂർണ്ണമായും കിടപ്പിലായ അവസ്ഥയിലായിരിക്കണം (Bedridden/Mentally Challenged).",
      "രോഗിയെ പരിചരിക്കുന്നതിനാൽ മറ്റ് ജോലികൾക്ക് പോകാൻ കഴിയാത്ത കുടുംബാംഗമായിരിക്കണം പരിചാരകൻ.",
      "കുടുംബ വാർഷിക വരുമാനം ബിപിഎൽ പരിധിയിൽ ആയിരിക്കണം (മുൻഗണനാ കാർഡ് ഉള്ളവർക്ക് വരുമാന സർട്ടിഫിക്കറ്റ് ഒഴിവാക്കിയിട്ടുണ്ട്).",
      "രോഗിക്ക് മറ്റ് പെൻഷനുകൾ ഉണ്ടെങ്കിലും പരിചാരകന് ആശ്വാസകിരണം ലഭിക്കും."
    ],
    eligibility_en: [
      "Patient must be permanently bedridden or afflicted with severe intellectual/locomotor disability.",
      "Caregiver must be unable to take up employment due to full-time caregiving duties.",
      "Family must be under BPL limit (priority ration card holders exempted from income proof).",
      "Caregiver is eligible even if patient receives social security pension."
    ],
    required_documents_ml: [
      "രോഗി കിടപ്പിലാണെന്ന് സാക്ഷ്യപ്പെടുത്തുന്ന മെഡിക്കൽ ഓഫീസറുടെ സർട്ടിഫിക്കറ്റ്",
      "രോഗിയുടെയും പരിചാരകന്റെയും ആധാർ കാർഡുകൾ",
      "റേഷൻ കാർഡ് പകർപ്പ്",
      "പരിചാരകന്റെ ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്",
      "രോഗിയുടെ സമീപകാല ഫോട്ടോ"
    ],
    required_documents_en: [
      "Doctor Certificate certifying patient is bedridden",
      "Aadhaar cards of both patient and caregiver",
      "Ration Card copy",
      "Caregiver bank passbook copy",
      "Recent photograph of the patient"
    ],
    procedure_ml: [
      "ഘട്ടം 1: നിശ്ചിത ഫോറത്തിൽ മെഡിക്കൽ സർട്ടിഫിക്കറ്റും വിവരങ്ങളും പൂരിപ്പിക്കുക.",
      "ഘട്ടം 2: അടുത്തുള്ള അക്ഷയ കേന്ദ്രം വഴിയോ സാമൂഹ്യ സുരക്ഷാ മിഷൻ വെബ്സൈറ്റ് വഴിയോ അപേക്ഷിക്കുക.",
      "ഘട്ടം 3: അപേക്ഷാ ഫോറം ഐ.സി.ഡി.എസ് (ICDS) സൂപ്പർവൈസർ / പഞ്ചായത്തിൽ സമർപ്പിക്കുക.",
      "ഘട്ടം 4: അങ്കണവാടി വർക്കറുടെ ഫീൽഡ് പരിശോധനയ്ക്ക് ശേഷം പെൻഷൻ അനുവദിക്കുന്നു."
    ],
    procedure_en: [
      "Step 1: Fill application with medical officer certification.",
      "Step 2: Submit via nearest Akshaya Centre or KSSM portal.",
      "Step 3: Submit physical application to local ICDS Supervisor / CDPO Office.",
      "Step 4: Anganwadi field inquiry verification before approval."
    ],
    official_link: "http://socialsecuritymission.gov.in/scheme_info.php?id=MQ==",
    source_reference: "Kerala Social Security Mission Aswasakiranam Guidelines",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "ഗവ. മെഡിക്കൽ ഓഫീസറുടെ സർട്ടിഫിക്കറ്റും അങ്കണവാടി വർക്കറുടെ ഫീൽഡ് ഇൻസ്പെക്ഷനും നിർബന്ധമാണ്."
  },
  {
    id: "vayomithram",
    name_ml: "വയോമിത്രം പദ്ധതി (മുതിർന്നവർക്കുള്ള സൗജന്യ മൊബൈൽ ക്ലിനിക്ക്)",
    name_en: "Vayomithram Project (Geriatric Mobile Health Care)",
    category: "health",
    department_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    department_en: "Kerala Social Security Mission",
    target_group_ml: "മുനിസിപ്പാലിറ്റി/കോർപ്പറേഷൻ പരിധിയിലെ 65 വയസ്സ് കഴിഞ്ഞ മുതിർന്ന പൗരന്മാർ",
    target_group_en: "Senior Citizens aged 65 and above in urban local bodies",
    benefit_ml: "സൗജന്യ ഡോക്ടർ പരിശോധന, സൗജന്യ മരുന്നുകൾ, സാന്ത്വന പരിചരണ (Palliative) സേവനങ്ങൾ.",
    benefit_en: "Free doctor consultation, free monthly medicines for BP/Diabetes, and palliative care.",
    monthly_amount: 0,
    min_age: 65,
    max_income: 9999999,
    requires_disability: false,
    eligibility_ml: [
      "65 വയസ്സോ അതിൽ കൂടുതലോ പ്രായമുള്ള മുതിർന്ന പൗരന്മാർ.",
      "പദ്ധതി നിലവിലുള്ള കോർപ്പറേഷൻ അല്ലെങ്കിൽ മുനിസിപ്പാലിറ്റി പരിധിയിൽ താമസിക്കുന്നവരായിരിക്കണം.",
      "വരുമാന പരിധിയില്ല (എല്ലാ മുതിർന്നവർക്കും സൗജന്യ ചികിത്സ ലഭിക്കും)."
    ],
    eligibility_en: [
      "Senior citizens aged 65 or above.",
      "Resident of Municipal Corporations or Municipalities where Vayomithram operates.",
      "No income ceiling — open to all elderly residents."
    ],
    required_documents_ml: [
      "പ്രായം തെളിയിക്കുന്ന രേഖ (ആധാർ / വോട്ടർ ഐഡി)",
      "റസിഡൻസ് സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ റേഷൻ കാർഡ്",
      "മുൻകാല മെഡിക്കൽ കുറിപ്പടികൾ"
    ],
    required_documents_en: [
      "Age Proof (Aadhaar / Voter ID)",
      "Residence Proof / Ration Card",
      "Existing Medical Prescriptions (for continuing refills)"
    ],
    procedure_ml: [
      "ഘട്ടം 1: നിങ്ങളുടെ വാർഡിൽ മൊബൈൽ ക്ലിനിക്ക് എത്തുന്ന ദിവസം കമ്മ്യൂണിറ്റി ഹാളിലോ ക്ലബ്ബിലോ സന്ദർശിക്കുക.",
      "ഘട്ടം 2: വയോമിത്രം ഹെൽത്ത് കാർഡിനായി രജിസ്റ്റർ ചെയ്യുക.",
      "ഘട്ടം 3: ഡോക്ടറുടെ സൗജന്യ പരിശോധനയും ബിപി/ഷുഗർ മരുന്നുകളും അപ്പപ്പോൾ കൈപ്പറ്റുക."
    ],
    procedure_en: [
      "Step 1: Visit scheduled mobile clinic location in your ward (Community Hall/Anganwadi).",
      "Step 2: Register for free Vayomithram Health Card.",
      "Step 3: Undergo check-up and collect monthly chronic illness medicines on the spot."
    ],
    official_link: "http://socialsecuritymission.gov.in/scheme_info.php?id=NA==",
    source_reference: "KSSM Vayomithram Urban Geriatric Healthcare Program",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "മൊബൈൽ മെഡിക്കൽ യൂണിറ്റിൽ നേരിട്ട് ഹാജരാകണം."
  },
  {
    id: "udid_card",
    name_ml: "സ്വാവലംബൻ കാർഡ് / ഏകീകൃത ഭിന്നശേഷി തിരിച്ചറിയൽ കാർഡ് (UDID)",
    name_en: "Unique Disability ID (UDID) Card",
    category: "pwd",
    department_ml: "കേന്ദ്ര ഭിന്നശേഷി ശാക്തീകരണ വകുപ്പ് (DEPwD)",
    department_en: "Department of Empowerment of Persons with Disabilities",
    target_group_ml: "എല്ലാ വിഭാഗങ്ങളിലുംപെട്ട ഭിന്നശേഷിക്കാർ",
    target_group_en: "All persons with disabilities across recognized 21 categories",
    benefit_ml: "രാജ്യവ്യാപകമായി സാധുതയുള്ള ഏകീകൃത സ്മാർട്ട് കാർഡ്; കെ.എസ്.ആർ.ടി.സി ബസ് യാത്രാ ഇളവ്, ട്രെയിൻ കൺസെഷൻ, ഉപകരണ വിതരണം.",
    benefit_en: "Nationally recognized Smart Card for rail/bus travel concessions, assistive aids, and DBT welfare.",
    monthly_amount: 0,
    min_age: 0,
    max_income: 9999999,
    requires_disability: true,
    min_disability_pct: 40,
    eligibility_ml: [
      "RPwD Act 2016 പ്രകാരം അംഗീകരിക്കപ്പെട്ട 21 വൈകല്യ വിഭാഗങ്ങളിൽ പെട്ടവർ.",
      "വൈകല്യത്തിന്റെ അളവ് 40 ശതമാനമോ അതിൽ കൂടുതലോ ആയിരിക്കണം.",
      "വരുമാന പരിധിയില്ല."
    ],
    eligibility_en: [
      "Persons with any of the 21 benchmark disabilities defined under RPwD Act 2016.",
      "Disability level must be assessed at 40% or more.",
      "No income limit."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ്",
      "നിലവിലുള്ള മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് (ഉണ്ടെങ്കിൽ)",
      "പാസ്പോർട്ട് സൈസ് ഫോട്ടോ",
      "ഒപ്പ് അല്ലെങ്കിൽ വിരലടയാളം"
    ],
    required_documents_en: [
      "Aadhaar Card",
      "Existing Disability Certificate (if issued)",
      "Passport size colour photograph",
      "Signature or thumb impression"
    ],
    procedure_ml: [
      "ഘട്ടം 1: www.swavlambancard.gov.in പോർട്ടൽ വഴി അല്ലെങ്കിൽ അക്ഷയ കേന്ദ്രം വഴി അപേക്ഷിക്കുക.",
      "ഘട്ടം 2: നിശ്ചിത തീയതിയിൽ ജില്ലാ/താലൂക്ക് ആശുപത്രി മെഡിക്കൽ ബോർഡിന് മുന്നിൽ ഹാജരാകുക.",
      "ഘട്ടം 3: മെഡിക്കൽ ബോർഡ് പരിശോധന പൂർത്തിയായാൽ ഓൺലൈനായി ഇ-കാർഡും തപാലിൽ പ്ലാസ്റ്റിക് സ്മാർട്ട് കാർഡും ലഭിക്കും."
    ],
    procedure_en: [
      "Step 1: Apply online at swavlambancard.gov.in or via Akshaya Centre.",
      "Step 2: Attend scheduled Medical Board examination at designated hospital.",
      "Step 3: Download digital e-UDID card; physical smart card dispatched via India Post."
    ],
    official_link: "https://www.swavlambancard.gov.in/",
    source_reference: "Ministry of Social Justice & Empowerment, Govt of India",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "മെഡിക്കൽ ബോർഡിന് മുൻപിൽ നേരിട്ടുള്ള പരിശോധന നിർബന്ധമാണ്."
  },
  {
    id: "kasp_health",
    name_ml: "കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി (KASP)",
    name_en: "Karunya Arogya Suraksha Padhathi (KASP)",
    category: "health",
    department_ml: "സ്റ്റേറ്റ് ഹെൽത്ത് ഏജൻസി (SHA) കേരളം",
    department_en: "State Health Agency Kerala",
    target_group_ml: "റേഷൻ കാർഡ് മുൻഗണനാ വിഭാഗങ്ങൾ (പിങ്ക് / മഞ്ഞ കാർഡുകാർ)",
    target_group_en: "Priority ration card holders (Pink PHH / Yellow AAY)",
    benefit_ml: "കുടുംബത്തിന് പ്രതിവർഷം ₹5 ലക്ഷം രൂപ വരെയുള്ള സൗജന്യ കിടത്തിച്ചികിത്സ.",
    benefit_en: "Free secondary & tertiary hospitalization coverage up to ₹5 Lakhs per family per year.",
    monthly_amount: 0,
    min_age: 0,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "മഞ്ഞ (AAY) അല്ലെങ്കിൽ പിങ്ക് (PHH) റേഷൻ കാർഡ് ഉള്ള കുടുംബങ്ങൾ.",
      "കാരുണ്യ ബെനവലന്റ് ഫണ്ട് (KBF) ഗുണഭോക്താക്കൾ.",
      "കേരളത്തിലെ എല്ലാ സർക്കാർ മെഡിക്കൽ കോളേജുകളിലും അംഗീകൃത സ്വകാര്യ ആശുപത്രികളിലും കാഷ്‌ലെസ്സ് ചികിത്സ."
    ],
    eligibility_en: [
      "Families holding Yellow (AAY) or Pink (PHH) priority ration cards.",
      "Enrolled beneficiaries under Karunya Benevolent Fund (KBF).",
      "Cashless hospitalization across empanelled government and private hospitals."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ്",
      "റേഷൻ കാർഡ് (Pink/Yellow ഒറിജിനൽ)",
      "രോഗിയുടെ തിരിച്ചറിയൽ കാർഡ്"
    ],
    required_documents_en: [
      "Aadhaar Card",
      "Original Ration Card (Pink PHH or Yellow AAY)",
      "Patient photo ID"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അംഗീകൃത ആശുപത്രിയിലെ KASP കിയോസ്കിൽ (ആരോഗ്യമിത്ര ഡെസ്ക്) റേഷൻ കാർഡും ആധാറും നൽകുക.",
      "ഘട്ടം 2: വിരലടയാളം / OTP വഴി ഗുണഭോക്താവിനെ പരിശോധിക്കുന്നു.",
      "ഘട്ടം 3: ആശുപത്രിയിൽ പൂർണ്ണമായും സൗജന്യ കാഷ്‌ലെസ്സ് ചികിത്സ ലഭ്യമാക്കുന്നു."
    ],
    procedure_en: [
      "Step 1: Present Ration Card and Aadhaar at the KASP Arogyamithra desk at hospital.",
      "Step 2: Biometric/OTP authentication verifies family membership.",
      "Step 3: Direct cashless admission and discharge."
    ],
    official_link: "https://sha.kerala.gov.in/",
    source_reference: "State Health Agency Kerala KASP Guidelines",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "ആശുപത്രിയിലെ KASP കിയോസ്കിൽ നേരിട്ട് ഹാജരാകണം."
  },
  {
    id: "widow_pension",
    name_ml: "ഇന്ദിരാഗാന്ധി ദേശീയ വിധവ / നിരാലംബ പെൻഷൻ (സേവന)",
    name_en: "Indira Gandhi National Widow / Destitute Pension (Sevana)",
    category: "senior",
    department_ml: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / സാമൂഹ്യ സുരക്ഷാ മിഷൻ",
    department_en: "Local Self Government Dept / Social Security",
    target_group_ml: "ഭർത്താവ് മരണപ്പെട്ട നിർദ്ധനരായ വിധവകൾ",
    target_group_en: "Destitute and low-income widows",
    benefit_ml: "പ്രതിമാസം ₹1,600 വീതം ബാങ്ക് അക്കൗണ്ടിലേക്ക് ലഭിക്കുന്നു.",
    benefit_en: "₹1,600 per month credited directly to bank account.",
    monthly_amount: 1600,
    min_age: 18,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "അപേക്ഷക വിധവയായിരിക്കണം (ഭർത്താവ് മരണപ്പെട്ട സ്ത്രീ).",
      "കഴിഞ്ഞ 2 വർഷമായി കേരളത്തിൽ സ്ഥിരതാമസക്കാരിയായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത്.",
      "മറ്റ് സർക്കാർ സർവീസ് പെൻഷനുകളോ പുനർവിവാഹമോ ചെയ്തിട്ടുണ്ടാകരുത്."
    ],
    eligibility_en: [
      "Applicant must be a widow (surviving spouse).",
      "Permanent resident of Kerala for past 2 continuous years.",
      "Annual family income must not exceed ₹1,00,000.",
      "Must not be remarried or receiving other statutory service pensions."
    ],
    required_documents_ml: [
      "ഭർത്താവിന്റെ മരണ സർട്ടിഫിക്കറ്റ് (Death Certificate)",
      "ആധാർ കാർഡ്",
      "റേഷൻ കാർഡ് പകർപ്പ്",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റും പുനർവിവാഹം ചെയ്തിട്ടില്ലെന്ന സർട്ടിഫിക്കറ്റും",
      "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
    ],
    required_documents_en: [
      "Husband's Death Certificate",
      "Aadhaar Card",
      "Ration Card copy",
      "Income & Non-Remarriage Certificate from Village Officer",
      "Bank passbook copy with IFSC code"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അക്ഷയ കേന്ദ്രം വഴി സേവന പോർട്ടലിൽ അപേക്ഷിക്കുക.",
      "ഘട്ടം 2: മരണ സർട്ടിഫിക്കറ്റും ഫോറവും പഞ്ചായത്ത് ഓഫീസിൽ സമർപ്പിക്കുക.",
      "ഘട്ടം 3: വാർഡ് അന്വേഷണത്തിന് ശേഷം പെൻഷൻ അനുവദിക്കുന്നു."
    ],
    procedure_en: [
      "Step 1: Apply via Akshaya Centre on Sevana portal.",
      "Step 2: Submit hard copy with Death Certificate to local body.",
      "Step 3: Verification and approval by Panchayat."
    ],
    official_link: "https://welfarepension.lsgkerala.gov.in/",
    source_reference: "Kerala Sevana Widow Pension Rules",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "അക്ഷയ ഓൺലൈൻ സബ്മിഷനും തദ്ദേശ സ്വയംഭരണ ഫീൽഡ് ഇൻസ്പെക്ഷനും നിർബന്ധമാണ്."
  },
  {
    id: "unmarried_women_pension",
    name_ml: "50 വയസ്സ് കഴിഞ്ഞ അവിവാഹിതരായ വനിതകൾക്കുള്ള പെൻഷൻ",
    name_en: "Pension for Unmarried Women Aged 50+ (Sevana)",
    category: "senior",
    department_ml: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ്",
    department_en: "Local Self Government Dept Kerala",
    target_group_ml: "50 വയസ്സ് പൂർത്തിയായ അവിവാഹിതരായ സ്ത്രീകൾ",
    target_group_en: "Unmarried women who have attained 50 years of age",
    benefit_ml: "പ്രതിമാസം ₹1,600 പെൻഷൻ.",
    benefit_en: "₹1,600 monthly pension directly to bank account.",
    monthly_amount: 1600,
    min_age: 50,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "50 വയസ്സോ അതിൽ കൂടുതലോ പ്രായമുണ്ടായിരിക്കണം.",
      "വിവാഹിതയാകാത്ത വനിതയായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത്.",
      "മറ്റ് സർക്കാർ/സർവീസ് പെൻഷനുകൾ ലഭിക്കുന്നവരായിരിക്കരുത്."
    ],
    eligibility_en: [
      "Must have completed 50 years of age.",
      "Must be unmarried.",
      "Annual family income must not exceed ₹1,00,000.",
      "Must not receive other statutory service pensions."
    ],
    required_documents_ml: [
      "പ്രായം തെളിയിക്കുന്ന സ്കൂൾ സർട്ടിഫിക്കറ്റ് / വോട്ടർ ഐഡി",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള അവിവാഹിത സർട്ടിഫിക്കറ്റ്",
      "ആധാർ കാർഡ് & റേഷൻ കാർഡ്",
      "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
    ],
    required_documents_en: [
      "Age proof document (Voter ID / School Certificate)",
      "Unmarried Certificate from Village Officer",
      "Aadhaar Card & Ration Card",
      "Bank passbook copy"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അക്ഷയ കേന്ദ്രം വഴി സേവന പോർട്ടലിൽ അപേക്ഷിക്കുക.",
      "ഘട്ടം 2: പഞ്ചായത്ത്/നഗരസഭയിൽ ഫയൽ പരിശോധന.",
      "ഘട്ടം 3: വാർഷിക മസ്റ്ററിംഗ് വഴി തുടർ പെൻഷൻ ഉറപ്പാക്കുക."
    ],
    procedure_en: [
      "Step 1: Apply through Akshaya on Sevana portal.",
      "Step 2: Panchayat enquiry and document verification.",
      "Step 3: Biometric mustering annually."
    ],
    official_link: "https://welfarepension.lsgkerala.gov.in/",
    source_reference: "Kerala Sevana Pension Rules (Unmarried Women Category)",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "അക്ഷയ കേന്ദ്രത്തിലെ ഓൺലൈൻ എൻട്രി നിർബന്ധമാണ്."
  },
  {
    id: "agricultural_workers_pension",
    name_ml: "കേരള കർഷകത്തൊഴിലാളി ക്ഷേമ പെൻഷൻ",
    name_en: "Kerala Agricultural Workers Welfare Pension (Sevana)",
    category: "senior",
    department_ml: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / കർഷകത്തൊഴിലാളി ക്ഷേമനിധി ബോർഡ്",
    department_en: "LSGD Kerala / Agricultural Workers Welfare Board",
    target_group_ml: "60 വയസ്സ് കഴിഞ്ഞ കർഷകത്തൊഴിലാളികൾ",
    target_group_en: "Agricultural laborers aged 60 and above",
    benefit_ml: "പ്രതിമാസം ₹1,600 വീതം ബാങ്ക് അക്കൗണ്ടിലേക്ക് ലഭിക്കുന്നു.",
    benefit_en: "₹1,600 monthly pension credited to bank account.",
    monthly_amount: 1600,
    min_age: 60,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "60 വയസ്സ് പൂർത്തിയായിരിക്കണം.",
      "കേരളത്തിൽ കുറഞ്ഞത് 10 വർഷമെങ്കിലും കർഷകത്തൊഴിലാളിയായി ജോലി ചെയ്തിട്ടുള്ളവരായിരിക്കണം.",
      "കുടുംബ വാർഷിക വരുമാനം ₹1,00,000 കവിയരുത്.",
      "മറ്റ് സാമൂഹ്യ സുരക്ഷാ പെൻഷനുകൾ വാങ്ങുന്നവരായിരിക്കരുത്."
    ],
    eligibility_en: [
      "Must be aged 60 or older.",
      "Must have worked as an agricultural laborer in Kerala for at least 10 years.",
      "Annual family income must not exceed ₹1,00,000.",
      "Must not receive other statutory pensions."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ് & റേഷൻ കാർഡ്",
      "കർഷകത്തൊഴിലാളിയാണെന്ന് തെളിയിക്കുന്ന തദ്ദേശ ജനപ്രതിനിധിയുടെ സർട്ടിഫിക്കറ്റ്",
      "വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള വരുമാന സർട്ടിഫിക്കറ്റ്",
      "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
    ],
    required_documents_en: [
      "Aadhaar Card & Ration Card",
      "Agricultural Laborer Certificate from Local Representative",
      "Income Certificate from Village Officer",
      "Bank passbook copy with IFSC"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അക്ഷയ കേന്ദ്രം വഴി സേവന പോർട്ടലിൽ അപേക്ഷ സമർപ്പിക്കുക.",
      "ഘട്ടം 2: പഞ്ചായത്ത് ഓഫീസിൽ രേഖകൾ ഏൽപ്പിക്കുക.",
      "ഘട്ടം 3: ഫീൽഡ് ഇൻസ്പെക്ഷന് ശേഷം അക്കൗണ്ടിലേക്ക് പെൻഷൻ ലഭിക്കും."
    ],
    procedure_en: [
      "Step 1: Submit application via Akshaya Centre.",
      "Step 2: Submit physical verification documents to Panchayat.",
      "Step 3: Verification by Secretary and sanction."
    ],
    official_link: "https://welfarepension.lsgkerala.gov.in/",
    source_reference: "Kerala Agricultural Workers Act & Sevana Rules",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "അക്ഷയ കേന്ദ്രത്തിലെ ഓൺലൈൻ എൻട്രി നിർബന്ധമാണ്."
  },
  {
    id: "snehasparsham",
    name_ml: "സ്നേഹസ്പർശം പദ്ധതി (നിരാലംബരായ അമ്മമാർക്കുള്ള ധനസഹായം)",
    name_en: "Snehasparsham Scheme (KSSM)",
    category: "caregiver",
    department_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)",
    department_en: "Kerala Social Security Mission",
    target_group_ml: "നിരാലംബരായ അവിവാഹിതരായ അമ്മമാർ",
    target_group_en: "Unwed mothers and destitute women in distress",
    benefit_ml: "പ്രതിമാസം ₹1,000 വീതം ധനസഹായം.",
    benefit_en: "₹1,000 per month financial aid credited to bank account.",
    monthly_amount: 1000,
    min_age: 18,
    max_income: 100000,
    requires_disability: false,
    eligibility_ml: [
      "നിരാലംബരായ അവിവാഹിതരായ അമ്മമാർ.",
      "കേരളത്തിൽ സ്ഥിരതാമസക്കാരായിരിക്കണം.",
      "ബി.പി.എൽ (BPL) മുൻഗണനാ വിഭാഗത്തിൽ പെട്ടവരായിരിക്കണം."
    ],
    eligibility_en: [
      "Destitute unwed mothers residing in Kerala.",
      "Belonging to BPL priority category.",
      "Permanent resident of Kerala."
    ],
    required_documents_ml: [
      "ആധാർ കാർഡ് & റേഷൻ കാർഡ്",
      "അവിവാഹിതയായ അമ്മയാണെന്ന് സാക്ഷ്യപ്പെടുത്തുന്ന വില്ലേജ്/ഐസിഡിഎസ് സർട്ടിഫിക്കറ്റ്",
      "ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ്"
    ],
    required_documents_en: [
      "Aadhaar Card & Ration Card",
      "Certificate from ICDS Supervisor / Village Officer",
      "Bank passbook copy"
    ],
    procedure_ml: [
      "ഘട്ടം 1: അപേക്ഷാ ഫോറം പൂരിപ്പിച്ച് ഐ.സി.ഡി.എസ് (ICDS) പ്രോജക്ട് ഓഫീസിൽ സമർപ്പിക്കുക.",
      "ഘട്ടം 2: സാമൂഹ്യ സുരക്ഷാ മിഷൻ പരിശോധന പൂർത്തിയാക്കി ബാങ്ക് അക്കൗണ്ടിലേക്ക് ധനസഹായം നൽകുന്നു."
    ],
    procedure_en: [
      "Step 1: Submit filled application to local ICDS Project Office.",
      "Step 2: Verification by Social Security Mission and direct DBT transfer."
    ],
    official_link: "http://socialsecuritymission.gov.in/scheme_info.php?id=NQ==",
    source_reference: "Kerala Social Security Mission Snehasparsham Guidelines",
    last_verified: "നവംബർ 2026 (Verified November 2026)",
    human_assistance_required: "ഐ.സി.ഡി.എസ് പ്രോജക്ട് ഓഫീസറുടെ സാക്ഷ്യപ്പെടുത്തൽ നിർബന്ധമാണ്."
  }
];

export const FREQUENT_GOVERNMENT_TERMS = [
  {
    term_en: "Mustering (മസ്റ്ററിംഗ്)",
    term_ml: "മസ്റ്ററിംഗ് (ജീവൻ രേഖ സ്ഥിരീകരണം)",
    meaning_ml: "പെൻഷൻ വാങ്ങുന്ന ആൾ ജീവിച്ചിരിപ്പുണ്ടെന്ന് തെളിയിക്കാൻ എല്ലാ വർഷവും അക്ഷയ കേന്ദ്രത്തിൽ പോയി ആധാർ വഴി വിരലടയാളം (ബയോമെട്രിക്) നൽകുന്ന ഔദ്യോഗിക നടപടി. കിടപ്പിലായവർക്ക് പഞ്ചായത്ത് ജീവനക്കാർ വീട്ടിലെത്തി മസ്റ്ററിംഗ് ചെയ്തു നൽകും.",
    meaning_en: "Annual biometric life verification at Akshaya Centre to confirm the pensioner is alive. Bedridden seniors receive home mustering by panchayat staff."
  },
  {
    term_en: "NPCI Aadhaar Mapping (ബാങ്ക് ആധാർ മാപ്പിംഗ്)",
    term_ml: "എൻ.പി.സി.ഐ ആധാർ മാപ്പിംഗ്",
    meaning_ml: "സർക്കാർ പെൻഷൻ തുക തടസ്സമില്ലാതെ നേരിട്ട് നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിലേക്ക് ഡി.ബി.ടി (DBT) വഴി എത്താൻ ബാങ്ക് ശാഖയിൽ പോയി ആധാർ ലിങ്ക് ചെയ്യുന്ന പ്രക്രിയ. ബാങ്ക് അക്കൗണ്ട് ആധാറുമായി മാപ്പ് ചെയ്തില്ലെങ്കിൽ പെൻഷൻ റദ്ദാകാം.",
    meaning_en: "Linking your bank account to the National Payments Corporation of India (NPCI) mapper so government DBT pension reaches your account seamlessly."
  },
  {
    term_en: "PHH Priority Card (പിങ്ക് റേഷൻ കാർഡ്)",
    term_ml: "പിങ്ക് കാർഡ് (മുൻഗണനാ റേഷൻ കാർഡ് - PHH)",
    meaning_ml: "കേന്ദ്ര-സംസ്ഥാന സർക്കാരുകൾ നിർദ്ധന കുടുംബങ്ങൾക്ക് നൽകുന്ന മുൻഗണനാ റേഷൻ കാർഡ് (Priority House Hold). ഈ കാർഡുള്ളവർക്ക് വാർദ്ധക്യ പെൻഷനും KASP സൗജന്യ ചികിത്സയ്ക്കും പ്രത്യേക വരുമാന സർട്ടിഫിക്കറ്റ് ഇല്ലാതെ തന്നെ മുൻഗണന ലഭിക്കുന്നു.",
    meaning_en: "Priority Household (Pink) Ration Card under National Food Security Act, qualifying families for free KASP health insurance and streamlined pensions."
  },
  {
    term_en: "Benchmark Disability (40%+ വൈകല്യം)",
    term_ml: "ബെഞ്ച്മാർക്ക് വൈകല്യം (40 ശതമാനത്തിന് മുകളിൽ)",
    meaning_ml: "സർക്കാർ മെഡിക്കൽ ബോർഡ് പരിശോധിച്ച് നൽകുന്ന സർട്ടിഫിക്കറ്റിൽ വൈകല്യത്തിന്റെ തോത് 40 ശതമാനമോ അതിൽ കൂടുതലോ ഉണ്ടെങ്കിൽ മാത്രമേ ഭിന്നശേഷി പെൻഷനും മറ്റ് നിയമപരമായ ആനുകൂല്യങ്ങൾക്കും അർഹത ലഭിക്കൂ.",
    meaning_en: "Statutory threshold under RPwD Act 2016 requiring a certified medical board certificate of 40% or higher disability to qualify for state benefits."
  },
  {
    term_en: "UDID Card (സ്വാവലംബൻ കാർഡ്)",
    term_ml: "യു.ഡി.ഐ.ഡി കാർഡ് (ഏകീകൃത ഭിന്നശേഷി കാർഡ്)",
    meaning_ml: "കേന്ദ്ര സാമൂഹ്യനീതി മന്ത്രാലയം നൽകുന്ന രാജ്യവ്യാപക സാധുതയുള്ള ഏകീകൃത ഭിന്നശേഷി സ്മാർട്ട് കാർഡ്. മെഡിക്കൽ രേഖകൾ എപ്പോഴും കയ്യിൽ കൊണ്ടുനടക്കാതെ ഒരു കാർഡ് വഴി യാത്രാ ഇളവുകളും ചികിത്സാ സഹായങ്ങളും നേടാം.",
    meaning_en: "Unique Disability ID card issued by Government of India providing nationwide validity for rail concessions, bus passes, and equipment aids."
  }
];

export const HELPLINE_CONTACTS = [
  {
    name_ml: "മുതിർന്ന പൗരന്മാർക്കുള്ള ദേശീയ ഹെൽപ്‌ലൈൻ (Elder Line)",
    name_en: "National Helpline for Senior Citizens (Elder Line)",
    number: "14567",
    toll_free: true,
    timing_ml: "രാവിലെ 8 മണി മുതൽ രാത്രി 8 മണി വരെ (എല്ലാ ദിവസവും)",
    timing_en: "8:00 AM to 8:00 PM (Daily)",
    agency_ml: "കേന്ദ്ര സാമൂഹ്യനീതി മന്ത്രാലയവും കേരള സാമൂഹ്യനീതി വകുപ്പും",
    agency_en: "Ministry of Social Justice & Kerala Social Justice Dept"
  },
  {
    name_ml: "ദിശ ആരോഗ്യ ഹെൽപ്‌ലൈൻ (Disha Kerala Health Advisory)",
    name_en: "Disha Health Helpline Kerala",
    number: "1056",
    toll_free: true,
    timing_ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്നു (സൗജന്യം)",
    timing_en: "24x7 Round the Clock (Toll-Free)",
    agency_ml: "ആരോഗ്യ കുടുംബക്ഷേമ വകുപ്പ്, കേരള സർക്കാർ",
    agency_en: "Health & Family Welfare Dept, Govt of Kerala"
  },
  {
    name_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM Helpdesk)",
    name_en: "Kerala Social Security Mission Helpdesk",
    number: "1800 120 1001",
    toll_free: true,
    timing_ml: "ഓഫീസ് പ്രവൃത്തി ദിവസങ്ങളിൽ രാവിലെ 10 മുതൽ വൈകിട്ട് 5 വരെ",
    timing_en: "Working days (10:00 AM - 5:00 PM)",
    agency_ml: "കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ, പൂജപ്പുര, തിരുവനന്തപുരം",
    agency_en: "KSSM, Poojappura, Thiruvananthapuram"
  },
  {
    name_ml: "തദ്ദേശ സേവന പെൻഷൻ ഹെൽപ് ഡെസ്ക് (Sevana Pension Helpline)",
    name_en: "LSGD Sevana Pension Helpline",
    number: "0471 2724696",
    toll_free: false,
    timing_ml: "ഓഫീസ് പ്രവൃത്തി ദിവസങ്ങളിൽ രാവിലെ 10 മുതൽ വൈകിട്ട് 5 വരെ",
    timing_en: "Working days (10:00 AM - 5:00 PM)",
    agency_ml: "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / ഇൻഫർമേഷൻ കേരള മിഷൻ (IKM)",
    agency_en: "Local Self Government Dept / IKM Kerala"
  },
  {
    name_ml: "അക്ഷയ സംസ്ഥാന പ്രോജക്ട് ഓഫീസ് (Akshaya e-Kendra State Desk)",
    name_en: "Akshaya State Project Helpdesk",
    number: "0471 2525444",
    toll_free: false,
    timing_ml: "ഓഫീസ് പ്രവൃത്തി ദിവസങ്ങളിൽ",
    timing_en: "Working days",
    agency_ml: "കേരള സംസ്ഥാന ഐ.ടി മിഷൻ (KSITM)",
    agency_en: "Kerala State IT Mission"
  },
  {
    name_ml: "പൊതുവിതരണ ഉപഭോക്തൃ ഹെൽപ്‌ലൈൻ (Civil Supplies PDS / Ration Card)",
    name_en: "Food & Civil Supplies Ration Card Helpline",
    number: "1967",
    toll_free: true,
    timing_ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്നു",
    timing_en: "24x7 Available",
    agency_ml: "ഭക്ഷ്യ പൊതുവിതരണ വകുപ്പ്, കേരള സർക്കാർ",
    agency_en: "Food & Civil Supplies Dept, Govt of Kerala"
  }
];
