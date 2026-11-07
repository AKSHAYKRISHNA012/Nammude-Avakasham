export const INITIAL_MEDICATIONS = [
  {
    id: "med-1",
    name: "Telmisartan 40mg (ടെൽമിസാർട്ടൻ)",
    purpose_ml: "രക്തസമ്മർദ്ദം (BP) നിയന്ത്രിക്കാൻ",
    purpose_en: "Blood pressure management",
    time_of_day: "morning", // morning, afternoon, night
    time_label_ml: "രാവിലെ 8:00 AM",
    time_label_en: "Morning 8:00 AM",
    food_relation_ml: "പ്രഭാതഭക്ഷണത്തിന് ശേഷം",
    food_relation_en: "After breakfast",
    dosage: "1 ഗുളിക (1 Tablet)",
    status: "pending", // pending, taken, skipped
    history: [
      { date: "ഇന്നലെ രാവിലെ", status: "taken" },
      { date: "2 ദിവസം മുമ്പ്", status: "taken" }
    ],
    doctor: "Dr. K. Ramanathan, MD (Medicine)",
    reminder_audio_ml: "ശ്രീധരൻ ചേട്ടാ, രാവിലെ എട്ടു മണിയായി. പ്രഭാതഭക്ഷണത്തിന് ശേഷം രക്തസമ്മർദ്ദത്തിനുള്ള ടെൽമിസാർട്ടൻ ഗുളിക കഴിക്കാൻ സമയമായി."
  },
  {
    id: "med-2",
    name: "Metformin 500mg (മെറ്റ്ഫോർമിൻ)",
    purpose_ml: "പ്രമേഹം (Sugar) നിയന്ത്രിക്കാൻ",
    purpose_en: "Diabetes blood glucose control",
    time_of_day: "morning",
    time_label_ml: "രാവിലെ 8:30 AM",
    food_relation_ml: "പ്രഭാതഭക്ഷണത്തിന് ശേഷം",
    food_relation_en: "After breakfast",
    dosage: "1 ഗുളിക (1 Tablet)",
    status: "taken",
    history: [
      { date: "ഇന്ന് രാവിലെ", status: "taken" },
      { date: "ഇന്നലെ രാവിലെ", status: "taken" }
    ],
    doctor: "Dr. K. Ramanathan, MD",
    reminder_audio_ml: "പ്രഭാതഭക്ഷണത്തിന് ശേഷം പ്രമേഹത്തിന്റെ മെറ്റ്ഫോർമിൻ ഗുളിക കഴിക്കാൻ മറക്കരുത്."
  },
  {
    id: "med-3",
    name: "Pantoprazole 40mg (പാൻടോപ്രാസോൾ)",
    purpose_ml: "ഗ്യാസ്ട്രബിളും നെഞ്ചെരിച്ചിലും തടയാൻ",
    purpose_en: "Acidity and reflux prevention",
    time_of_day: "morning",
    time_label_ml: "രാവിലെ 7:00 AM",
    food_relation_ml: "പ്രഭാതഭക്ഷണത്തിന് അരമണിക്കൂർ മുമ്പ്",
    food_relation_en: "30 mins before breakfast (Empty stomach)",
    dosage: "1 കാപ്സ്യൂൾ (1 Capsule)",
    status: "taken",
    history: [
      { date: "ഇന്ന് രാവിലെ", status: "taken" }
    ],
    doctor: "Dr. K. Ramanathan, MD",
    reminder_audio_ml: "രാവിലെ വെറും വയറ്റിൽ കാപ്പി കുടിക്കുന്നതിന് മുൻപ് പാൻടോപ്രാസോൾ കഴിക്കുക."
  },
  {
    id: "med-4",
    name: "Atorvastatin 10mg (അറ്റോർവാസ്റ്റാറ്റിൻ)",
    purpose_ml: "കൊളസ്ട്രോൾ കുറയ്ക്കാൻ",
    purpose_en: "Cholesterol control",
    time_of_day: "night",
    time_label_ml: "രാത്രി 9:00 PM",
    food_relation_ml: "അത്താഴത്തിന് ശേഷം കിടക്കുന്നതിന് മുൻപ്",
    food_relation_en: "After dinner before bed",
    dosage: "1 ഗുളിക (1 Tablet)",
    status: "pending",
    history: [
      { date: "ഇന്നലെ രാത്രി", status: "taken" }
    ],
    doctor: "Dr. K. Ramanathan, MD",
    reminder_audio_ml: "രാത്രി അത്താഴത്തിന് ശേഷം കൊളസ്ട്രോളിന്റെ അറ്റോർവാസ്റ്റാറ്റിൻ ഗുളിക കഴിക്കാൻ സമയമായി."
  },
  {
    id: "med-5",
    name: "Shelcal HD Calcium (ഷെൽകൽ എച്ച്.ഡി)",
    purpose_ml: "എല്ലുകളുടെ ബലത്തിനും കാൽസ്യത്തിനും",
    purpose_en: "Bone density and Calcium + Vit D",
    time_of_day: "afternoon",
    time_label_ml: "ഉച്ചയ്ക്ക് 1:30 PM",
    food_relation_ml: "ഉച്ചഭക്ഷണത്തിന് ശേഷം",
    food_relation_en: "After lunch",
    dosage: "1 ഗുളിക (1 Tablet)",
    status: "pending",
    history: [],
    doctor: "Dr. Lathika Devi, Ortho",
    reminder_audio_ml: "ഉച്ചഭക്ഷണത്തിന് ശേഷം കാൽസ്യം ഗുളിക കഴിക്കുക."
  }
];

export const SAMPLE_PRESCRIPTIONS = [
  {
    id: "rx-1",
    doctorName: "Dr. K. Ramanathan, MBBS, MD (Gen Med)",
    hospital: "Medical College Hospital, Thiruvananthapuram",
    regNo: "TCMC 18452",
    date: "02 നവംബർ 2026",
    diagnosis_ml: "രക്താതിമർദ്ദവും (BP) ടൈപ്പ് 2 പ്രമേഹവും (Diabetes)",
    diagnosis_en: "Hypertension & Type 2 Diabetes Mellitus",
    medicines: [
      {
        name: "Tab. Telmisartan 40mg",
        timing_ml: "1-0-0 (രാവിലെ 1 എണ്ണം, ഭക്ഷണത്തിന് ശേഷം)",
        timing_en: "1-0-0 (Morning after breakfast)",
        duration: "30 ദിവസം (1 മാസം)",
        confidence: 0.98,
        readable: true
      },
      {
        name: "Tab. Metformin 500mg",
        timing_ml: "1-0-1 (രാവിലെയും രാത്രിയും ഭക്ഷണത്തിന് ശേഷം)",
        timing_en: "1-0-1 (Morning & Night after meals)",
        duration: "30 ദിവസം",
        confidence: 0.96,
        readable: true
      },
      {
        name: "Tab. Atorvastatin 10mg",
        timing_ml: "0-0-1 (രാത്രി ഉറങ്ങുന്നതിന് മുൻപ്)",
        timing_en: "0-0-1 (Night before sleep)",
        duration: "30 ദിവസം",
        confidence: 0.95,
        readable: true
      },
      {
        name: "Cap. Pantoprazole 40mg",
        timing_ml: "1-0-0 (രാവിലെ വെറും വയറ്റിൽ)",
        timing_en: "1-0-0 (Morning empty stomach)",
        duration: "14 ദിവസം",
        confidence: 0.94,
        readable: true
      }
    ],
    doctorAdvice_ml: "ഉപ്പ് കുറച്ച് ഉപയോഗിക്കുക. ദിവസവും 30 മിനിറ്റ് സാവധാനം നടക്കുക. 1 മാസം കഴിഞ്ഞ് ഷുഗറും ബി.പിയും പരിശോധിച്ച് വീണ്ടും കാണുക.",
    doctorAdvice_en: "Limit dietary sodium. Walk for 30 minutes daily. Follow up in 1 month with fasting glucose & BP chart.",
    pharmacistVerificationNote_ml: "ശ്രദ്ധിക്കുക: കുറിപ്പടിയിലെ അക്ഷരങ്ങൾ കൃത്യമായി പരിശോധിച്ചു. സംശയമുണ്ടെങ്കിൽ നിങ്ങളുടെ ഫാർമസിസ്റ്റുമായി ഒത്തുനോക്കുക."
  }
];

export const CAREGIVER_PROFILE = {
  name: "രാഹുൽ നായർ (Rahul Nair)",
  relationship_ml: "മകൻ (Son)",
  relationship_en: "Son",
  location: "Kochi / Abroad",
  phone: "+91 98471 23456",
  email: "rahul.nair2026@gmail.com",
  permissions: {
    missedDoseAlerts: true,
    prescriptionUpload: true,
    viewVisitSummary: true
  },
  recentAlerts: [
    {
      id: "alert-1",
      timestamp: "ഇന്നലെ വൈകുന്നേരം 6:30 PM",
      message_ml: "ശ്രീധരൻ നായർ ഇന്നത്തെ ഉച്ചയ്ക്കത്തെ കാൽസ്യം ഗുളിക കഴിച്ചത് രേഖപ്പെടുത്തിയിട്ടില്ല.",
      status: "sent"
    }
  ]
};

export const MEDICAL_HISTORY = {
  chronicConditions: [
    { name_ml: "രക്താതിമർദ്ദം (High Blood Pressure)", name_en: "Hypertension", since: "2018", status: "നിയന്ത്രണത്തിൽ (Controlled)" },
    { name_ml: "ടൈപ്പ് 2 പ്രമേഹം (Type 2 Diabetes)", name_en: "Type 2 Diabetes", since: "2020", status: "മരുന്നിലൂടെ നിയന്ത്രണത്തിൽ" },
    { name_ml: "കാൽമുട്ട് സന്ധിവാതം (Knee Osteoarthritis)", name_en: "Mild Knee Osteoarthritis", since: "2023", status: "വേദനസംഹാരികൾ ആവശ്യത്തിന് മാത്രം" }
  ],
  allergies: [
    { allergen: "Penicillin (പെൻസിലിൻ)", severity_ml: "കഠിനമായ അലർജി (ചൊറിച്ചിലും ശ്വാസതടസ്സവും)", severity_en: "Severe allergic reaction" },
    { allergen: "Sulfa Drugs (സൾഫ മരുന്നുകൾ)", severity_ml: "ചർമ്മത്തിൽ തടിപ്പ്", severity_en: "Mild skin rash" }
  ],
  pastVisits: [
    {
      date: "02 നവംബർ 2026",
      doctor: "Dr. K. Ramanathan, MD",
      hospital: "General Hospital, Thiruvananthapuram",
      notes_ml: "ബി.പി 138/88 mmHg. ഷുഗർ നിയന്ത്രണവിധേയമാണ്. മരുന്നുകൾ തുടരാൻ നിർദ്ദേശിച്ചു."
    },
    {
      date: "15 ആഗസ്റ്റ് 2026",
      doctor: "Dr. Lathika Devi, Ortho",
      hospital: "Taluk Hospital Nemom",
      notes_ml: "കാൽമുട്ട് വേദനയ്ക്ക് വ്യായാമവും കാൽസ്യവും നിർദ്ദേശിച്ചു."
    }
  ]
};
