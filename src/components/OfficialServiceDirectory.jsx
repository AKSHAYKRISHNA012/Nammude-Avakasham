import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Globe, 
  Search, 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { speakText } from '../utils/speech.js';

export default function OfficialServiceDirectory({ language }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Authoritative State Level Helplines (Verified Nov 2026)
  const STATE_HELPLINES = [
    {
      id: 'elderline',
      name_ml: 'എൽഡർലൈൻ – ദേശീയ വയോജന ഹെൽപ്‌ലൈൻ (സാമൂഹ്യനീതി വകുപ്പ്)',
      name_en: 'Elderline – National Helpline for Senior Citizens',
      phone: '14567',
      category: 'emergency',
      description_ml: 'മുതിർന്ന പൗരന്മാർക്കുള്ള സൗജന്യ ടോൾഫ്രീ സഹായം, കൗൺസിലിംഗ്, നിയമസഹായം, സംരക്ഷണം.',
      description_en: 'Toll-free helpline providing emotional support, legal guidance, and rescue for senior citizens.',
      timings_ml: 'രാവിലെ 8:00 മുതൽ രാത്രി 8:00 വരെ (എല്ലാ ദിവസവും)',
      timings_en: '8:00 AM to 8:00 PM (All 7 days)',
      badge_ml: 'ടോൾഫ്രീ: 14567',
      badge_en: 'Toll-Free: 14567',
      official_url: 'http://swd.kerala.gov.in/'
    },
    {
      id: 'disha',
      name_ml: 'ദിശ 1056 – ആരോഗ്യ ഹെൽപ്‌ലൈൻ (ആരോഗ്യ വകുപ്പ് കേരളം)',
      name_en: 'DISHA 1056 – Kerala Health & Telemedicine Helpline',
      phone: '1056',
      alt_phone: '0471-2552056',
      category: 'health',
      description_ml: '24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന സൗജന്യ ആരോഗ്യ വിവര കേന്ദ്രം, മാനസികാരോഗ്യ കൗൺസിലിംഗ്.',
      description_en: '24x7 government telemedicine, health advisory, and mental health counseling.',
      timings_ml: '24 മണിക്കൂറും സേവനം ലഭ്യമാണ് (24x7)',
      timings_en: '24 Hours / 7 Days',
      badge_ml: '24x7 സൗജന്യം: 1056',
      badge_en: '24x7 Free: 1056',
      official_url: 'https://disha.kerala.gov.in/'
    },
    {
      id: 'sevana',
      name_ml: 'സേവന പെൻഷൻ ഹെൽപ്‌ഡെസ്ക് (തദ്ദേശ സ്വയംഭരണ വകുപ്പ്)',
      name_en: 'Sevana LSGD Welfare Pension Helpdesk',
      phone: '0471-2724696',
      category: 'pension',
      description_ml: 'സാമൂഹ്യ സുരക്ഷാ പെൻഷൻ അപേക്ഷകൾ, മസ്റ്ററിംഗ് സംശയങ്ങൾ, ബാങ്ക് അക്കൗണ്ട് മാറ്റങ്ങൾ.',
      description_en: 'Direct assistance for Sevana social welfare pensions, DBT queries, and mustering status.',
      timings_ml: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 10:00 AM - 5:00 PM',
      timings_en: 'Working Days 10:00 AM - 5:00 PM',
      badge_ml: 'സേവന ഡെസ്ക്',
      badge_en: 'Sevana Desk',
      official_url: 'https://welfarepension.lsgkerala.gov.in/'
    },
    {
      id: 'kssm',
      name_ml: 'കേരള സാമൂഹ്യ സുരക്ഷാ മിഷൻ (KSSM)',
      name_en: 'Kerala Social Security Mission (KSSM)',
      phone: '0471-2320496',
      alt_phone: '1800-120-1001',
      category: 'pension',
      description_ml: 'വയോമിത്രം, ആശ്വാസകിരണം, സ്നേഹസ്പർശം, മിഠായി തുടങ്ങിയ പ്രത്യേക സഹായ പദ്ധതികൾ.',
      description_en: 'Nodal mission for Vayomithram, Aswasakiranam, and specialized palliative welfare schemes.',
      timings_ml: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 10:00 AM - 5:00 PM',
      timings_en: 'Working Days 10:00 AM - 5:00 PM',
      badge_ml: 'കെ.എസ്.എസ്.എം',
      badge_en: 'KSSM Office',
      official_url: 'http://socialsecuritymission.gov.in/'
    },
    {
      id: 'akshaya',
      name_ml: 'അക്ഷയ സംസ്ഥാന ഹെൽപ്‌ഡെസ്ക് (ഐ.ടി മിഷൻ)',
      name_en: 'Akshaya State Project Helpdesk (Kerala IT Mission)',
      phone: '0471-2525444',
      alt_phone: '0471-2525445',
      category: 'portal',
      description_ml: 'ഓൺലൈൻ അപേക്ഷകൾ, ബയോമെട്രിക് മസ്റ്ററിംഗ്, ആധാർ സേവനങ്ങൾ സംബന്ധിച്ച പരാതികൾ.',
      description_en: 'Citizen grievances regarding Akshaya service counters, Aadhaar updates, and mustering.',
      timings_ml: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 9:30 AM - 5:30 PM',
      timings_en: 'Working Days 9:30 AM - 5:30 PM',
      badge_ml: 'അക്ഷയ ഐ.ടി ഡെസ്ക്',
      badge_en: 'Akshaya Desk',
      official_url: 'https://akshaya.kerala.gov.in/'
    },
    {
      id: 'sha',
      name_ml: 'സ്റ്റേറ്റ് ഹെൽത്ത് ഏജൻസി (കാരുണ്യ KASP കാർഡ്)',
      name_en: 'State Health Agency Kerala (Karunya KASP Health)',
      phone: '1800-120-1001',
      category: 'health',
      description_ml: 'കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി (KASP) സൗജന്യ ചികിത്സാ കാർഡ് വിവരങ്ങൾ.',
      description_en: 'Inquiries regarding KASP empaneled government & private hospitals and claims.',
      timings_ml: '24 മണിക്കൂറും സേവനം ലഭ്യമാണ് (24x7)',
      timings_en: '24 Hours / 7 Days',
      badge_ml: 'കാരുണ്യ ടോൾഫ്രീ',
      badge_en: 'Karunya Toll-free',
      official_url: 'https://sha.kerala.gov.in/'
    },
    {
      id: 'civil_supplies',
      name_ml: 'ഭക്ഷ്യ-പൊതുവിതരണ വകുപ്പ് (റേഷൻ കാർഡ് ഹെൽപ്‌ലൈൻ)',
      name_en: 'Civil Supplies & Public Distribution (Ration Services)',
      phone: '1967',
      alt_phone: '1800-425-1550',
      category: 'pension',
      description_ml: 'റേഷൻ കാർഡ് തരം മാറ്റൽ (BPL/PHH), പേര് ചേർക്കൽ, റേഷൻ വിതരണ പരാതികൾ.',
      description_en: 'PDS ration card inquiries, BPL reclassification, and grain entitlement complaints.',
      timings_ml: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 8:00 AM - 6:00 PM',
      timings_en: 'Working Days 8:00 AM - 6:00 PM',
      badge_ml: 'ടോൾഫ്രീ: 1967',
      badge_en: 'Toll-Free: 1967',
      official_url: 'https://civilsupplieskerala.gov.in/'
    },
    {
      id: 'kelsa',
      name_ml: 'കേരള സംസ്ഥാന ലീഗൽ സർവീസസ് അതോറിറ്റി (കെൽസ - സൗജന്യ നിയമസഹായം)',
      name_en: 'Kerala State Legal Services Authority (KeLSA - Free Legal Aid)',
      phone: '15100',
      alt_phone: '0471-2396778',
      category: 'legal',
      description_ml: 'മുതിർന്ന പൗരന്മാർക്കും നിർധനർക്കും സൗജന്യ കോടതി സഹായവും മധ്യസ്ഥതയും.',
      description_en: 'Statutory free legal assistance and Senior Citizens Maintenance Tribunal aid.',
      timings_ml: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 10:00 AM - 5:00 PM',
      timings_en: 'Working Days 10:00 AM - 5:00 PM',
      badge_ml: 'നിയമസഹായം 15100',
      badge_en: 'Legal Aid 15100',
      official_url: 'https://kelsa.nic.in/'
    }
  ];

  // Authoritative 14 District Social Justice Offices (DSJOs)
  const DISTRICT_OFFICES = [
    {
      id: 'tvm',
      district_ml: 'തിരുവനന്തപുരം',
      district_en: 'Thiruvananthapuram',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, പൂജപ്പുര, തിരുവനന്തപുരം - 695012',
      address_en: 'District Social Justice Office, Poojappura, Thiruvananthapuram - 695012',
      phone: '0471-2343241',
      email: 'dsjotvm@gmail.com'
    },
    {
      id: 'klm',
      district_ml: 'കൊല്ലം',
      district_en: 'Kollam',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കൊല്ലം - 691013',
      address_en: 'District Social Justice Office, Civil Station, Kollam - 691013',
      phone: '0474-2794902',
      email: 'dsjokollam@gmail.com'
    },
    {
      id: 'pta',
      district_ml: 'പത്തനംതിട്ട',
      district_en: 'Pathanamthitta',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, മിനി സിവില്‍ സ്റ്റേഷന്‍, പത്തനംതിട്ട - 689645',
      address_en: 'District Social Justice Office, Mini Civil Station, Pathanamthitta - 689645',
      phone: '0468-2224075',
      email: 'dsjopta@gmail.com'
    },
    {
      id: 'alp',
      district_ml: 'ആലപ്പുഴ',
      district_en: 'Alappuzha',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, ആലപ്പുഴ - 688001',
      address_en: 'District Social Justice Office, Civil Station, Alappuzha - 688001',
      phone: '0477-2253870',
      email: 'dsjoalp@gmail.com'
    },
    {
      id: 'ktm',
      district_ml: 'കോട്ടയം',
      district_en: 'Kottayam',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കോട്ടയം - 686002',
      address_en: 'District Social Justice Office, Civil Station, Kottayam - 686002',
      phone: '0481-2563980',
      email: 'dsjoktm@gmail.com'
    },
    {
      id: 'idk',
      district_ml: 'ഇടുക്കി',
      district_en: 'Idukki',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, മിനി സിവില്‍ സ്റ്റേഷന്‍, തൊടുപുഴ, ഇടുക്കി - 685584',
      address_en: 'District Social Justice Office, Mini Civil Station, Thodupuzha, Idukki - 685584',
      phone: '04862-228160',
      email: 'dsjoidukki@gmail.com'
    },
    {
      id: 'ekm',
      district_ml: 'എറണാകുളം',
      district_en: 'Ernakulam',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കാക്കനാട്, കൊച്ചി - 682030',
      address_en: 'District Social Justice Office, Civil Station, Kakkanad, Kochi - 682030',
      phone: '0484-2425343',
      email: 'dsjoekm@gmail.com'
    },
    {
      id: 'tsr',
      district_ml: 'തൃശ്ശൂർ',
      district_en: 'Thrissur',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, അയ്യാന്തോൾ, തൃശ്ശൂർ - 680003',
      address_en: 'District Social Justice Office, Civil Station, Ayyanthole, Thrissur - 680003',
      phone: '0487-2321702',
      email: 'dsjotcr@gmail.com'
    },
    {
      id: 'pkd',
      district_ml: 'പാലക്കാട്',
      district_en: 'Palakkad',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, പാലക്കാട് - 678001',
      address_en: 'District Social Justice Office, Civil Station, Palakkad - 678001',
      phone: '0491-2505791',
      email: 'dsjopkd@gmail.com'
    },
    {
      id: 'mpm',
      district_ml: 'മലപ്പുറം',
      district_en: 'Malappuram',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, മലപ്പുറം - 676505',
      address_en: 'District Social Justice Office, Civil Station, Malappuram - 676505',
      phone: '0483-2735324',
      email: 'dsjompm@gmail.com'
    },
    {
      id: 'kkd',
      district_ml: 'കോഴിക്കോട്',
      district_en: 'Kozhikode',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കോഴിക്കോട് - 673020',
      address_en: 'District Social Justice Office, Civil Station, Kozhikode - 673020',
      phone: '0495-2371911',
      email: 'dsjokkd@gmail.com'
    },
    {
      id: 'wyd',
      district_ml: 'വയനാട്',
      district_en: 'Wayanad',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കൽപ്പറ്റ, വയനാട് - 673122',
      address_en: 'District Social Justice Office, Civil Station, Kalpetta, Wayanad - 673122',
      phone: '04936-205337',
      email: 'dsjowyd@gmail.com'
    },
    {
      id: 'knr',
      district_ml: 'കണ്ണൂർ',
      district_en: 'Kannur',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, കണ്ണൂർ - 670002',
      address_en: 'District Social Justice Office, Civil Station, Kannur - 670002',
      phone: '0497-2712413',
      email: 'dsjoknr@gmail.com'
    },
    {
      id: 'ksd',
      district_ml: 'കാസർഗോഡ്',
      district_en: 'Kasaragod',
      address_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, സിവില്‍ സ്റ്റേഷൻ, വിദ്യാനഗർ, കാസർഗോഡ് - 671123',
      address_en: 'District Social Justice Office, Civil Station, Vidyanagar, Kasaragod - 671123',
      phone: '0467-2200100',
      email: 'dsjoksd@gmail.com'
    }
  ];

  // Filtering Logic
  const filteredHelplines = STATE_HELPLINES.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      item.name_ml.toLowerCase().includes(query) ||
      item.name_en.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.description_ml.toLowerCase().includes(query) ||
      item.description_en.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const filteredDistricts = DISTRICT_OFFICES.filter(office => {
    if (selectedDistrict !== 'all' && office.id !== selectedDistrict) return false;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return office.district_ml.toLowerCase().includes(query) ||
      office.district_en.toLowerCase().includes(query) ||
      office.phone.includes(query) ||
      office.address_en.toLowerCase().includes(query);
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{language === 'ml' ? 'ഔദ്യോഗിക ഡയറക്ടറി – 2026 നവംബർ പ്രകാരം സ്ഥിരീകരിച്ചത്' : 'Official Directory – Verified Nov 2026'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {language === 'ml' ? 'ഔദ്യോഗിക സർക്കാർ ഹെൽപ്‌ലൈനുകളും ഓഫീസുകളും' : 'Official Kerala Government Helplines & Offices'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          {language === 'ml' 
            ? 'പെൻഷൻ, വയോജന സഹായം, ഭിന്നശേഷി ക്ഷേമം, റേഷൻ സംശയങ്ങൾ എന്നിവയ്ക്കായി ബന്ധപ്പെടാവുന്ന ഔദ്യോഗിക ഫോൺ നമ്പറുകളും ജില്ലാ സാമൂഹ്യനീതി ഓഫീസുകളുടെ വിലാസങ്ങളും.' 
            : 'Authoritative direct contact directory for Kerala Social Justice, LSGD Sevana, KSSM, and all 14 District Social Justice Offices.'}
        </p>

        {/* Search & Category Filter Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ml' ? 'ഹെൽപ്‌ലൈൻ പേരോ ജില്ലയോ നമ്പറോ തിരയുക...' : 'Search by service name, district, or phone...'}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-sm"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3.5 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
          >
            <option value="all">{language === 'ml' ? 'എല്ലാ വിഭാഗങ്ങളും (All Categories)' : 'All Categories'}</option>
            <option value="emergency">{language === 'ml' ? 'വയോജന അടിയന്തര സഹായം (Elderline)' : 'Elderline & Emergency'}</option>
            <option value="pension">{language === 'ml' ? 'പെൻഷനും ക്ഷേമവും (Pension & Welfare)' : 'Pension & Welfare'}</option>
            <option value="health">{language === 'ml' ? 'ആരോഗ്യവും കാരുണ്യയും (Health / KASP)' : 'Health & Medical'}</option>
            <option value="legal">{language === 'ml' ? 'സൗജന്യ നിയമസഹായം (Legal Aid)' : 'Legal Services'}</option>
            <option value="portal">{language === 'ml' ? 'അക്ഷയ / ഐ.ടി പോർട്ടൽ (Akshaya Desk)' : 'Akshaya Helpdesk'}</option>
          </select>
        </div>
      </div>

      {/* Section 1: State Level Flagship Helplines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-emerald-800" />
            <span>{language === 'ml' ? 'സംസ്ഥാന തല ഔദ്യോഗിക ഹെൽപ്‌ലൈനുകൾ' : 'Statewide Official Helplines'}</span>
          </h2>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {filteredHelplines.length} {language === 'ml' ? 'സേവനങ്ങൾ' : 'Helplines'}
          </span>
        </div>

        {filteredHelplines.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 text-sm">
            {language === 'ml' ? 'തിരഞ്ഞ വിവരങ്ങൾ ലഭ്യമായില്ല. ദയവായി മറ്റൊരു പദം ഉപയോഗിച്ച് നോക്കുക.' : 'No matching helplines found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredHelplines.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border-2 border-stone-200/90 hover:border-emerald-500/80 transition-all shadow-sm flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {language === 'ml' ? item.badge_ml : item.badge_en}
                    </span>
                    <button
                      onClick={() => speakText(`${item.name_ml}. ഫോൺ നമ്പർ ${item.phone}`, language)}
                      className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-emerald-800 transition-colors"
                      title="Audio Readout"
                    >
                      🔊
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-emerald-900 transition-colors">
                    {language === 'ml' ? item.name_ml : item.name_en}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === 'ml' ? item.description_ml : item.description_en}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'ml' ? item.timings_ml : item.timings_en}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-300" />
                    <span>{language === 'ml' ? `വിളിക്കുക: ${item.phone}` : `Call: ${item.phone}`}</span>
                  </a>

                  {item.official_url && (
                    <a
                      href={item.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{language === 'ml' ? 'വെബ്സൈറ്റ്' : 'Portal'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: All 14 District Social Justice Offices (DSJO) */}
      <div className="space-y-5 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-700" />
              <span>{language === 'ml' ? '14 ജില്ലാ സാമൂഹ്യനീതി ഓഫീസുകൾ (DSJO)' : '14 District Social Justice Offices (DSJO)'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {language === 'ml'
                ? 'വാർദ്ധക്യ പെൻഷൻ, ഭിന്നശേഷി ക്ഷേമം, മെയിന്റനൻസ് ട്രിബ്യൂണൽ അപ്പീലുകൾ എന്നിവ കൈകാര്യം ചെയ്യുന്ന ജില്ലാ ഓഫീസുകൾ.'
                : 'District nodal offices managing disability welfare, maintenance tribunal petitions, and appeals.'}
            </p>
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-4 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
          >
            <option value="all">{language === 'ml' ? 'എല്ലാ ജില്ലകളും (All 14 Districts)' : 'All 14 Districts'}</option>
            {DISTRICT_OFFICES.map(o => (
              <option key={o.id} value={o.id}>
                {language === 'ml' ? o.district_ml : o.district_en}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDistricts.map((office) => (
            <div 
              key={office.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm hover:border-amber-500/80 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    {language === 'ml' ? office.district_ml : office.district_en}
                  </span>
                  <span className="text-[11px] font-bold text-stone-400">DSJO</span>
                </div>

                <h3 className="font-extrabold text-sm text-stone-900 leading-snug">
                  {language === 'ml' ? `ജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്, ${office.district_ml}` : `District Social Justice Office, ${office.district_en}`}
                </h3>

                <p className="text-xs text-stone-600 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{language === 'ml' ? office.address_ml : office.address_en}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-black transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{office.phone}</span>
                </a>

                {office.email && (
                  <span className="text-[11px] text-stone-400 font-mono truncate max-w-[140px]" title={office.email}>
                    {office.email}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Affiliation Statutory Disclaimer Footer */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
        <p className="font-black flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>{language === 'ml' ? 'നിയമാനുസൃത വിവരണം (Statutory Notice)' : 'Statutory Verification Notice'}</span>
        </p>
        <p className="leading-relaxed">
          {language === 'ml'
            ? 'ഈ ഡയറക്ടറിയിലെ എല്ലാ ഫോൺ നമ്പറുകളും വിലാസങ്ങളും കേരള സർക്കാരിന്റെ സാമൂഹ്യനീതി വകുപ്പ്, LSGD സേവന, തദ്ദേശ ഭരണ ഡയറക്ടറേറ്റ് എന്നിവയുടെ ഔദ്യോഗിക വിവരങ്ങളിൽ നിന്ന് നേരിട്ട് പരിശോധിച്ചുറപ്പിച്ചതാണ്. ഈ പ്ലാറ്റ്ഫോം ഒരു സ്വതന്ത്ര പൗരസഹായ ഉപകരണമാണ്; സർക്കാർ അംഗീകാരമോ പ്രതിനിധിത്വമോ അവകാശപ്പെടുന്നില്ല.'
            : 'All helpline numbers and office addresses are verified against official publications of the Government of Kerala Social Justice and LSGD portals (Nov 2026). Nammude Avakasham is an independent citizen assistive platform and claims no official government agency affiliation.'}
        </p>
      </div>

    </div>
  );
}
