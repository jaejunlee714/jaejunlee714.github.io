/* ==========================================================================
   SITE_DATA — Single Source of Truth
   프로필, 소속, 이메일, 링크, 논문, 학력, 튜토리얼, 리뷰어 이력 등
   모든 콘텐츠는 이 파일 한 곳에서만 수정하면 About / Publications / CV에
   자동으로 반영됩니다. (학회 필터 탭도 publications의 venueGroup에서 자동 생성)
   ========================================================================== */

window.SITE_DATA = {
  siteTitle: "Jaejun's Personal Website",
  name: "Jaejun Lee",
  koreanName: "이재준",
  eyebrow: "Ph.D. Student · School of Computing, KAIST",
  affiliationShort: "School of Computing, KAIST",
  affiliationFull: "Big Data Intelligence Lab, KAIST",
  email: "jjlee98@kaist.ac.kr",
  profileImage: "assets/img/profile_jj.jpg",
  cvPdf: "assets/pdf/cv.pdf",
  social: {
    scholar: "https://scholar.google.com/citations?user=G5UMYkUAAAAJ",
    github: "https://github.com/jaejunlee714"
  },
  bioParagraphs: [
    'Hi, I\'m Jaejun Lee, a PhD Student of <a href="https://cs.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">School of Computing at KAIST</a>. I\'m a member of the <a href="https://bdi-lab.kaist.ac.kr" target="_blank" rel="noopener noreferrer">Big Data Intelligence lab</a> led by <a href="https://bdi-lab.kaist.ac.kr" target="_blank" rel="noopener noreferrer">Professor Joyce Jiyoung Whang</a>.',
    'My research interests lie in graph machine learning, graph neural networks, and representation learning on knowledge graphs. I believe that the potential of graph-structured data extends well beyond its current use, and I am dedicated to exploring novel applications across a broader range of domains.'
  ],
  graphKeywords: [
    "Knowledge Graphs",
    "GNNs",
    "Hyper-Relational",
    "Inductive",
    "Virtual Nodes",
    "Diffusion",
    "Multimodal",
    "Generalization"
  ],

  publications: [
    {
      id: "mavn",
      shortKey: "MAVN",
      title: "Learn When and Where to Connect: Adaptive Virtual Nodes for Dynamic Message Passing on Graphs",
      authors: ["Jaejun Lee", "Joyce Jiyoung Whang*"],
      venueShort: "KDD 2026",
      venueGroup: "KDD",
      venueFull: "Proceedings of the 32nd SIGKDD Conference on Knowledge Discovery and Data Mining V.2, pp. 2485–2496",
      year: 2026,
      selected: true,
      preview: "assets/img/publication_preview/MAVN.jpg",
      links: {
        pdf: "https://dl.acm.org/doi/pdf/10.1145/3770855.3818013",
        arxiv: "https://arxiv.org/abs/2606.03068",
        code: "https://github.com/bdi-lab/MAVN",
        html: "https://dl.acm.org/doi/10.1145/3770855.3818013"
      },
      bibtex: `@inproceedings{mavn,
  author    = {Jaejun Lee and Joyce Jiyoung Whang},
  title     = {{L}earn {W}hen and {W}here to {C}onnect: Adaptive Virtual Nodes for Dynamic Message Passing on Graphs},
  booktitle = {Proceedings of the 32nd SIGKDD Conference on Knowledge Discovery and Data Mining V.2},
  year      = {2026},
  pages     = {2485--2496},
  doi       = {10.1145/3770855.3818013}
}`
    },
    {
      id: "krepe",
      shortKey: "KREPE",
      title: "Generative Representation Learning on Hyper-relational Knowledge Graphs via Masked Discrete Diffusion",
      authors: ["Jaejun Lee", "Seheon Kim", "Joyce Jiyoung Whang*"],
      venueShort: "ICML 2026",
      venueGroup: "ICML",
      venueFull: "Proceedings of the 43rd International Conference on Machine Learning, pp. 64205–64232",
      year: 2026,
      selected: true,
      preview: "assets/img/publication_preview/KREPE.png",
      links: {
        pdf: "https://raw.githubusercontent.com/mlresearch/v306/main/assets/lee26ad/lee26ad.pdf",
        arxiv: "https://arxiv.org/abs/2605.24064",
        code: "https://github.com/bdi-lab/KREPE",
        html: "https://proceedings.mlr.press/v306/lee26ad.html"
      },
      bibtex: `@inproceedings{krepe,
  author    = {Jaejun Lee and Seheon Kim and Joyce Jiyoung Whang},
  title     = {Generative Representation Learning on Hyper-relational Knowledge Graphs via Masked Discrete Diffusion},
  booktitle = {Proceedings of the 43rd International Conference on Machine Learning},
  year      = {2026},
  pages     = {64205--64232}
}`
    },
    {
      id: "maypl",
      shortKey: "MAYPL",
      title: "Structure Is All You Need: Structural Representation Learning on Hyper-Relational Knowledge Graphs",
      authors: ["Jaejun Lee", "Joyce Jiyoung Whang*"],
      venueShort: "ICML 2025",
      venueGroup: "ICML",
      venueFull: "Proceedings of the 42nd International Conference on Machine Learning, pp. 33765–33783",
      year: 2025,
      selected: true,
      preview: "assets/img/publication_preview/MAYPL.png",
      links: {
        pdf: "https://raw.githubusercontent.com/mlresearch/v267/main/assets/lee25ah/lee25ah.pdf",
        code: "https://github.com/bdi-lab/MAYPL",
        poster: "https://bdi-lab.kaist.ac.kr/down/ICML2025_MAYPL_poster.pdf",
        html: "https://proceedings.mlr.press/v267/lee25ah.html"
      },
      bibtex: `@inproceedings{maypl,
  author    = {Jaejun Lee and Joyce Jiyoung Whang},
  title     = {{S}tructure {I}s {A}ll {Y}ou {N}eed: Structural Representation Learning on Hyper-Relational Knowledge Graphs},
  booktitle = {Proceedings of the 42nd International Conference on Machine Learning},
  year      = {2025},
  pages     = {33765--33783}
}`
    },
    {
      id: "stabkg",
      shortKey: "STABKG",
      title: "Stability and Generalization Capability of Subgraph Reasoning Models for Inductive Knowledge Graph Completion",
      authors: ["Minsung Hwang", "Jaejun Lee", "Joyce Jiyoung Whang*"],
      venueShort: "ICML 2025",
      venueGroup: "ICML",
      venueFull: "Proceedings of the 42nd International Conference on Machine Learning, pp. 26376–26411",
      year: 2025,
      selected: false,
      preview: "assets/img/publication_preview/STABKG.png",
      links: {
        pdf: "https://raw.githubusercontent.com/mlresearch/v267/main/assets/hwang25a/hwang25a.pdf",
        poster: "https://bdi-lab.kaist.ac.kr/down/ICML2025_IndTh_poster.pdf",
        html: "https://proceedings.mlr.press/v267/hwang25a.html"
      },
      bibtex: `@inproceedings{stabkg,
  author    = {Minsung Hwang and Jaejun Lee and Joyce Jiyoung Whang},
  title     = {Stability and Generalization Capability of Subgraph Reasoning Models for Inductive Knowledge Graph Completion},
  booktitle = {Proceedings of the 42nd International Conference on Machine Learning},
  year      = {2025},
  pages     = {26376--26411}
}`
    },
    {
      id: "reed",
      shortKey: "ReED",
      title: "PAC-Bayesian Generalization Bounds for Knowledge Graph Representation Learning",
      authors: ["Jaejun Lee", "Minsung Hwang", "Joyce Jiyoung Whang*"],
      venueShort: "ICML 2024",
      venueGroup: "ICML",
      venueFull: "Proceedings of the 41st International Conference on Machine Learning, pp. 26589–26620",
      year: 2024,
      selected: false,
      preview: "assets/img/publication_preview/ReED.png",
      links: {
        pdf: "https://raw.githubusercontent.com/mlresearch/v235/main/assets/lee24i/lee24i.pdf",
        arxiv: "https://arxiv.org/abs/2405.06418",
        code: "https://github.com/bdi-lab/ReED",
        slides: "https://bdi-lab.kaist.ac.kr/down/icml2024_reed_slide.pdf",
        poster: "https://bdi-lab.kaist.ac.kr/down/icml2024_reed_poster.pdf",
        html: "https://proceedings.mlr.press/v235/lee24i.html"
      },
      bibtex: `@inproceedings{reed,
  author    = {Jaejun Lee and Minsung Hwang and Joyce Jiyoung Whang},
  title     = {{PAC}-{B}ayesian Generalization Bounds for Knowledge Graph Representation Learning},
  booktitle = {Proceedings of the 41st International Conference on Machine Learning},
  year      = {2024},
  pages     = {26589--26620}
}`
    },
    {
      id: "vista",
      shortKey: "VISTA",
      title: "VISTA: Visual-Textual Knowledge Graph Representation Learning",
      authors: ["Jaejun Lee", "Chanyoung Chung", "Hochang Lee", "Sungho Jo", "Joyce Jiyoung Whang*"],
      venueShort: "EMNLP Findings 2023",
      venueGroup: "EMNLP",
      venueFull: "Findings of the Association for Computational Linguistics: EMNLP 2023, pp. 7314–7328",
      year: 2023,
      selected: true,
      preview: "assets/img/publication_preview/VISTA.png",
      links: {
        pdf: "https://aclanthology.org/2023.findings-emnlp.488.pdf",
        code: "https://github.com/bdi-lab/VISTA",
        slides: "https://bdi-lab.kaist.ac.kr/down/vista_emnlp2023_slides.pdf",
        poster: "https://bdi-lab.kaist.ac.kr/down/vista_emnlp2023_poster.pdf",
        video: "https://youtu.be/e47L3yZlmC8?si=0ZqZEdBQddlWmr7d",
        html: "https://aclanthology.org/2023.findings-emnlp.488/"
      },
      bibtex: `@inproceedings{vista,
  author    = {Jaejun Lee and Chanyoung Chung and Hochang Lee and Sungho Jo and Joyce Jiyoung Whang},
  title     = {{VISTA}: Visual-Textual Knowledge Graph Representation Learning},
  booktitle = {Findings of the Association for Computational Linguistics: EMNLP 2023},
  year      = {2023},
  pages     = {7314--7328},
  doi       = {10.18653/v1/2023.findings-emnlp.488}
}`
    },
    {
      id: "hynt",
      shortKey: "HyNT",
      title: "Representation Learning on Hyper-Relational and Numeric Knowledge Graphs with Transformers",
      authors: ["Chanyoung Chung†", "Jaejun Lee†", "Joyce Jiyoung Whang*"],
      venueShort: "KDD 2023",
      venueGroup: "KDD",
      venueFull: "Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining, pp. 310–322",
      year: 2023,
      selected: false,
      preview: "assets/img/publication_preview/HyNT.jpg",
      links: {
        pdf: "https://dl.acm.org/doi/pdf/10.1145/3580305.3599490",
        arxiv: "https://arxiv.org/abs/2305.18256",
        code: "https://github.com/bdi-lab/HyNT",
        slides: "https://bdi-lab.kaist.ac.kr/down/hynt_kdd_video_full_static.pdf",
        poster: "https://bdi-lab.kaist.ac.kr/down/hynt_kdd2023_poster.pdf",
        video: "https://youtu.be/V23Y7kdmWUE",
        html: "https://dl.acm.org/doi/10.1145/3580305.3599490"
      },
      bibtex: `@inproceedings{hynt,
  author    = {Chanyoung Chung and Jaejun Lee and Joyce Jiyoung Whang},
  title     = {Representation Learning on Hyper-Relational and Numeric Knowledge Graphs with Transformers},
  booktitle = {Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining},
  year      = {2023},
  pages     = {310--322},
  doi       = {10.1145/3580305.3599490}
}`
    },
    {
      id: "ingram",
      shortKey: "InGram",
      title: "InGram: Inductive Knowledge Graph Embedding via Relation Graphs",
      authors: ["Jaejun Lee", "Chanyoung Chung", "Joyce Jiyoung Whang*"],
      venueShort: "ICML 2023",
      venueGroup: "ICML",
      venueFull: "Proceedings of the 40th International Conference on Machine Learning, pp. 18796–18809",
      year: 2023,
      selected: true,
      preview: "assets/img/publication_preview/InGram.png",
      links: {
        pdf: "https://proceedings.mlr.press/v202/lee23c/lee23c.pdf",
        arxiv: "https://arxiv.org/abs/2305.19987",
        code: "https://github.com/bdi-lab/InGram",
        slides: "https://bdi-lab.kaist.ac.kr/down/ingram_icml2023_slides.pdf",
        poster: "https://bdi-lab.kaist.ac.kr/down/ingram_icml2023_poster.pdf",
        video: "https://www.youtube.com/watch?v=hDi1sdDlMZ8",
        html: "https://proceedings.mlr.press/v202/lee23c.html"
      },
      bibtex: `@inproceedings{ingram,
  author    = {Jaejun Lee and Chanyoung Chung and Joyce Jiyoung Whang},
  title     = {{InGram}: Inductive Knowledge Graph Embedding via Relation Graphs},
  booktitle = {Proceedings of the 40th International Conference on Machine Learning},
  year      = {2023},
  pages     = {18796--18809}
}`
    },
    {
      id: "robokg",
      shortKey: "roboKG",
      title: "Semantic Grasping via a Knowledge Graph of Robotic Manipulation: A Graph Representation Learning Approach",
      authors: ["Ji Ho Kwak†", "Jaejun Lee†", "Joyce Jiyoung Whang*", "Sungho Jo*"],
      venueShort: "IEEE RA-L 2022",
      venueGroup: "IEEE RA-L",
      venueFull: "IEEE Robotics and Automation Letters, Vol. 7, No. 4, pp. 9397–9404",
      note: "Also presented in IROS 2022",
      year: 2022,
      selected: false,
      preview: "assets/img/publication_preview/roboKG.png",
      links: {
        pdf: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9830861",
        slides: "https://bdi-lab.kaist.ac.kr/down/robokg_slides.pdf",
        video: "https://www.youtube.com/watch?v=nifBo7_NzLc",
        html: "https://ieeexplore.ieee.org/document/9830861"
      },
      bibtex: `@article{robokg,
  author  = {Ji Ho Kwak and Jaejun Lee and Joyce Jiyoung Whang and Sungho Jo},
  title   = {Semantic Grasping via a Knowledge Graph of Robotic Manipulation: A Graph Representation Learning Approach},
  journal = {IEEE Robotics and Automation Letters},
  year    = {2022},
  volume  = {7},
  number  = {4},
  pages   = {9397--9404},
  doi     = {10.1109/LRA.2022.3191194}
}`
    }
  ],

  education: [
    {
      degree: "Ph.D. (Advisor: Joyce Jiyoung Whang)",
      degreeUrl: "https://bdi-lab.kaist.ac.kr",
      period: "2023.02 – present",
      lines: [
        '<a href="https://cs.kaist.ac.kr" target="_blank" rel="noopener noreferrer">School of Computing</a>',
        '<a href="https://kaist.ac.kr" target="_blank" rel="noopener noreferrer">Korea Advanced Institute of Science and Technology (KAIST)</a>'
      ]
    },
    {
      degree: "M.S. (Advisor: Joyce Jiyoung Whang)",
      degreeUrl: "https://bdi-lab.kaist.ac.kr",
      period: "2021.08 – 2023.02",
      lines: [
        '<a href="https://cs.kaist.ac.kr" target="_blank" rel="noopener noreferrer">School of Computing</a>',
        '<a href="https://kaist.ac.kr" target="_blank" rel="noopener noreferrer">Korea Advanced Institute of Science and Technology (KAIST)</a>'
      ]
    },
    {
      degree: "B.S., School of Computing",
      degreeUrl: "https://cs.kaist.ac.kr",
      period: "2017.02 – 2021.08",
      lines: [
        'Double Major: <a href="https://mathsci.kaist.ac.kr" target="_blank" rel="noopener noreferrer">Department of Mathematical Sciences</a>',
        '<a href="https://kaist.ac.kr" target="_blank" rel="noopener noreferrer">Korea Advanced Institute of Science and Technology (KAIST)</a>'
      ]
    }
  ],

  tutorials: [
    {
      role: "Assistant Tutor",
      venue: "KDD 2026",
      title: "Knowledge Discovery with Knowledge Graphs: From Structural Embeddings to Generative Reasoning (KnowKG)",
      url: "https://bdi-lab.github.io/kkg_kdd2026/"
    },
    {
      role: "Assistant Tutor",
      venue: "ISWC 2025",
      title: "Key Facets in Modern Knowledge Graph Representation Learning (KeyKGRL)",
      url: "https://bdi-lab.github.io/keykgrl_iswc2025/"
    }
  ],

  peerReview: [
    { category: "Conferences", venues: "NeurIPS, ICML, KDD, AAAI" },
    { category: "Journals", venues: "TKDD, TMLR" },
    { category: "Others", venues: "ACL ARR" }
  ]
};
