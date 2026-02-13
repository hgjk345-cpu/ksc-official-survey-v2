import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // 브라우저 탭 이름 수정
  title: '국제대회 만족도 조사 - 대한체육회',
  description: '대한체육회 국제대회 참여자 만족도 조사 시스템입니다.',
  openGraph: {
    title: '국제대회 만족도 조사',
    description: '여러분의 소중한 의견을 들려주세요.',
    images: [
      {
        // 대한체육회 로고로 미리보기 이미지 교체
        url: 'https://gongu.copyright.or.kr/cmmn/file/getImage.do?atchFileId=452e64e94c2b6005805cd68110510e336af993dfdb7415bcd4285d9e22c3cdc6&fileSn=1',
        width: 800,
        height: 400,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://gongu.copyright.or.kr/cmmn/file/getImage.do?atchFileId=452e64e94c2b6005805cd68110510e336af993dfdb7415bcd4285d9e22c3cdc6&fileSn=1'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}