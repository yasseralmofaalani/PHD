# PHD — عرض مناقشة أطروحة الدكتوراه

التخطيط والتحكم الذكي بالشبكة الخليوية في بيئة نظم المعلومات الجغرافية.

**الموقع المنشور:** https://yasseralmofaalani.github.io/PHD/

## التطوير المحلي

```bash
npm install
npm run dev
```

## البناء والنشر

البناء مُعدّ لـ GitHub Pages تحت المسار `/PHD/`:

```bash
npm run build
npm run preview   # معاينة محلية بنفس مسار /PHD/
```

عند الدفع إلى `main` يعمل workflow [Deploy GitHub Pages](.github/workflows/deploy-pages.yml) تلقائياً.

### إعداد GitHub Pages (مرة واحدة)

1. Settings → Pages  
2. Source: **GitHub Actions**

## مسارات الصور

كل الصور الثابتة في `public/` وتُحمَّل عبر `assetUrl()` / `ThesisImage` مع `import.meta.env.BASE_URL` حتى تعمل على GitHub Pages دون كسر المسارات.
