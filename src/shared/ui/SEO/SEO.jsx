import { useEffect } from 'react';

const SEO = ({ 
  title = "물어봐이브 (Mureo-Vibe) - 귀여운 고양이 AI 어시스턴트 🐱",
  description = "귀여운 고양이 AI가 냥~ 하고 답해주는 재미있는 AI 챗봇 서비스입니다. 궁금한 것을 물어보세요!",
  keywords = "AI 챗봇, 고양이 AI, 물어봐이브, Mureo-Vibe, 인공지능, 챗봇, 고양이, 냥, AI 어시스턴트",
  ogImage = "https://mureo-vibe.com/og-image.png",
  twitterImage = "https://mureo-vibe.com/twitter-image.png"
}) => {
  useEffect(() => {
    // 동적으로 메타 태그 업데이트
    document.title = title;
    
    // Description 메타 태그
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Keywords 메타 태그
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Open Graph 메타 태그들
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': twitterImage
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
    
  }, [title, description, keywords, ogImage, twitterImage]);

  return null;
};

export default SEO; 