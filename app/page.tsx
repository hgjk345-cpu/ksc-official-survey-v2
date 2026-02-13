'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const SUPABASE_URL = 'https://rpvcdyvqxlwndliusuiq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_U5lC9dHdplgC-vyWsXkYVQ_kSRtHOf3';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 다국어 번역 데이터
const translations: any = {
  KR: {
    title: '국제대회 만족도 조사',
    labels: {
      country: '국가 선택', gender: '성별 선택', age: '연령대 선택',
      male: '남성', female: '여성', start: '시작하기', back: '뒤로가기',
      submit: '제출하기', success: '성공!', thanks: '참여해주셔서 감사합니다.', restart: '다시 시작',
    },
    ages: ['10대', '20대', '30대', '40대', '50대 이상'],
    questions: [
      '경기장 시설 및 환경은 적합했습니까?', '대회 준비 사항은 만족스럽습니까?',
      '대회 운영 및 소통은 적절했습니까?', '타 대회와의 차별점이 있었습니까?',
      '안전 대책은 잘 되었습니까?', '전반적으로 만족하십니까?', '참여 경험이 도움이 되겠습니까?',
    ],
  },
  US: {
    title: 'International Competition Survey',
    labels: {
      country: 'SELECT COUNTRY', gender: 'GENDER', age: 'AGE GROUP',
      male: 'Male', female: 'Female', start: 'START', back: 'Back',
      submit: 'SUBMIT', success: 'SUCCESS!', thanks: 'Thank you for participating.', restart: 'RESTART',
    },
    ages: ['10s', '20s', '30s', '40s', '50s+'],
    questions: [
      'Were the facilities suitable?', 'Are you satisfied with the prep?',
      'Was the communication appropriate?', 'Was it distinct from other events?',
      'Were safety measures good?', 'Are you satisfied overall?', 'Will this experience be helpful?',
    ],
  },
  JP: {
    title: '国際大会満足度調査',
    labels: {
      country: '国を選択', gender: '性別を選択', age: '年齢層を選択',
      male: '男性', female: '女性', start: '開始する', back: '戻る',
      submit: '送信', success: '成功！', thanks: 'ご参加ありがとうございました.', restart: '最初から',
    },
    ages: ['10代', '20代', '30代', '40代', '50代以上'],
    questions: [
      '会場の施設は適切でしたか？', '準備事項に満足していますか？',
      '運営と疎通は適切でしたか？', '他大会との差別化はありましたか？',
      '安全対策は十分でしたか？', '全体的に満足していますか？', 'この経験は役に立ちますか？',
    ],
  },
  CN: {
    title: '国际赛事满意度调查',
    labels: {
      country: '选择国家', gender: '选择性别', age: '选择年龄段',
      male: '男', female: '女', start: '开始', back: '返回',
      submit: '提交', success: '成功！', thanks: '感谢您的参与。', restart: '重新开始',
    },
    ages: ['10代', '20代', '30代', '40代', '50代以上'],
    questions: [
      '场馆设施是否合适？', '准备工作是否满意？', '运营与沟通是否妥当？',
      '是否有独特之处？', '安全保障是否到位？', '总体是否满意？', '是否有助于未来？',
    ],
  },
  VN: {
    title: 'Khảo sát Đại hội Quốc tế',
    labels: {
      country: 'Chọn quốc gia', gender: 'Chọn giới tính', age: 'Chọn độ tuổi',
      male: 'Nam', female: 'Nữ', start: 'Bắt đầu', back: 'Quay lại',
      submit: 'Gửi', success: 'THÀNH CÔNG!', thanks: 'Cảm ơn bạn đã tham gia.', restart: 'Bắt đầu lại',
    },
    ages: ['10-19', '20-29', '30-39', '40-49', 'Trên 50'],
    questions: [
      'Cơ sở vật chất có tốt không?', 'Công tác chuẩn bị có tốt không?',
      'Tổ chức có phù hợp không?', 'Có điểm khác biệt không?',
      'An toàn có đảm bảo không?', 'Bạn có hài lòng không?', 'Trải nghiệm có ích không?',
    ],
  },
};

const countryList = [
  { code: 'KR', name: '대한민국 (Korea)' },
  { code: 'US', name: '미국 (USA)' },
  { code: 'JP', name: '일본 (Japan)' },
  { code: 'CN', name: '중국 (China)' },
  { code: 'VN', name: '베트남 (Vietnam)' },
];

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ country: 'KR', gender: '', age: '' });
  const [scores, setScores] = useState(Array(7).fill(0));
  const [loading, setLoading] = useState(false);

  const t = translations[info.country] || translations.KR;
  const LOGO_URL = 'https://gongu.copyright.or.kr/cmmn/file/getImage.do?atchFileId=452e64e94c2b6005805cd68110510e336af993dfdb7415bcd4285d9e22c3cdc6&fileSn=1';

  const handleSubmit = async () => {
    if (!info.gender || !info.age || scores.includes(0)) return alert('Error: Missing info');
    setLoading(true);
    const payload: any = { lang: info.country, country: info.country };
    [Number(info.gender), Number(info.age), ...scores].forEach((s, i) => {
      payload[`score_${i + 1}`] = s;
    });
    const { error } = await supabase.from('survey_results').insert([payload]);
    if (!error) setStep(2);
    else { alert(error.message); setLoading(false); }
  };

  if (step === 0)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-black">
        <div className="mb-8 p-2">
          <img src={LOGO_URL} alt="대한체육회" className="h-16 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-black mb-8 tracking-tighter text-center text-slate-900">{t.title}</h1>
        <div className="w-full max-w-xs space-y-4">
          <select value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} className="w-full p-4 rounded-2xl border-2 bg-white font-bold shadow-lg text-black">
            {countryList.map((c) => (<option key={c.code} value={c.code}>{c.name}</option>))}
          </select>
          <select value={info.gender} onChange={(e) => setInfo({ ...info, gender: e.target.value })} className="w-full p-4 rounded-2xl border-2 bg-white font-bold shadow-lg text-black">
            <option value="">{t.labels.gender}</option>
            <option value="1">{t.labels.male}</option>
            <option value="2">{t.labels.female}</option>
          </select>
          <select value={info.age} onChange={(e) => setInfo({ ...info, age: e.target.value })} className="w-full p-4 rounded-2xl border-2 bg-white font-bold shadow-lg text-black">
            <option value="">{t.labels.age}</option>
            {t.ages.map((ageText: string, idx: number) => (<option key={idx} value={idx + 1}>{ageText}</option>))}
          </select>
          <button onClick={() => info.gender && info.age ? setStep(1) : alert('All fields required')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl mt-4">
            {t.labels.start}
          </button>
        </div>
      </div>
    );

  if (step === 1)
    return (
      <div className="min-h-screen bg-slate-50 p-4 pb-20 text-black">
        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src={LOGO_URL} alt="로고" className="h-10 w-auto" />
          </div>
          <button onClick={() => setStep(0)} className="mb-6 text-slate-400 font-bold">← {t.labels.back}</button>
          <h2 className="text-xl font-black text-slate-800 mb-10 text-center italic underline underline-offset-8">{t.title}</h2>
          <div className="space-y-12">
            {t.questions.map((q: string, i: number) => (
              <div key={i}>
                <p className="font-bold text-slate-700 mb-5 leading-snug"><span className="text-blue-600 mr-2">Q{i + 3}.</span> {q}</p>
                <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => { const ns = [...scores]; ns[i] = n; setScores(ns); }} className={`flex-1 aspect-square rounded-xl border-2 font-black transition-all ${scores[i] === n ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-md' : 'border-slate-50 bg-slate-50 text-slate-300'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl mt-16 shadow-2xl active:scale-95 disabled:opacity-50">
            {loading ? '...' : t.labels.submit}
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center text-black">
      <img src={LOGO_URL} alt="로고" className="h-12 w-auto mb-8" />
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
      <h2 className="text-3xl font-black text-slate-900 mb-2">{t.labels.success}</h2>
      <p className="text-slate-400 font-bold mb-10">{t.labels.thanks}</p>
      <button onClick={() => window.location.reload()} className="text-blue-600 font-black border-b-2 border-blue-600 pb-1">{t.labels.restart}</button>
    </div>
  );
}