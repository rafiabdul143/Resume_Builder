const domainRules = [
  {
    matches: ['recommend'],
    description: '{VERB} a {NAME} using collaborative filtering and content-based algorithms to provide personalized suggestions. Implemented user preference tracking, similarity scoring, and a real-time recommendation engine. Integrated a RESTful API backend with a responsive frontend dashboard to deliver accurate and scalable suggestions.',
    technologies: 'Python, Scikit-learn, Pandas, Flask, MySQL, HTML/CSS, JavaScript',
    coreFeature: 'recommendation algorithms and user preference modeling',
    appType: 'recommendation engine'
  },
  {
    matches: ['ml', 'machine learning', 'predict', 'classif', 'detection', 'recognition'],
    description: '{VERB} a {NAME} leveraging machine learning algorithms to analyze data patterns and deliver accurate predictions. Preprocessed and cleaned large datasets, trained and evaluated multiple models, and deployed the best-performing model via a REST API. Achieved measurable improvements in accuracy through hyperparameter tuning and cross-validation.',
    technologies: 'Python, Scikit-learn, TensorFlow/Keras, Pandas, NumPy, Flask, Matplotlib',
    coreFeature: 'ML model training, evaluation, and deployment pipeline',
    appType: 'machine learning application'
  },
  {
    matches: ['chat', 'messag', 'communication'],
    description: '{VERB} a {NAME} enabling real-time communication between users with instant message delivery. Implemented WebSocket-based bidirectional communication, user authentication with JWT tokens, message history storage, and online/offline status indicators. Designed a responsive UI supporting multiple chat rooms and direct messaging.',
    technologies: 'Node.js, Socket.io, Express.js, MongoDB, React, JWT, HTML/CSS',
    coreFeature: 'real-time WebSocket messaging and user session management',
    appType: 'real-time chat application'
  },
  {
    matches: ['ecommerce', 'e-commerce', 'shop', 'store', 'market'],
    description: '{VERB} a {NAME} with full product catalog, shopping cart, and secure checkout functionality. Implemented user authentication, product search and filtering, inventory management, and payment gateway integration. Built an admin dashboard for order tracking, product management, and sales analytics.',
    technologies: 'React, Node.js, Express.js, MongoDB, Stripe API, JWT, Redux, CSS',
    coreFeature: 'product management, cart system, and secure payment processing',
    appType: 'e-commerce platform'
  },
  {
    matches: ['health', 'hospital', 'medical', 'patient', 'doctor'],
    description: '{VERB} a {NAME} to streamline healthcare workflows including patient registration, appointment scheduling, and medical record management. Implemented role-based access control for doctors, nurses, and administrators. Integrated appointment reminders and a secure dashboard for real-time patient data monitoring.',
    technologies: 'Java, Spring Boot, MySQL, Hibernate, React, Bootstrap, REST API',
    coreFeature: 'patient management, appointment scheduling, and role-based access control',
    appType: 'healthcare management system'
  },
  {
    matches: ['bank', 'financ', 'payment', 'wallet', 'transaction'],
    description: '{VERB} a {NAME} enabling secure financial transactions, account management, and real-time balance tracking. Implemented multi-factor authentication, encrypted data storage, transaction history with filtering, and fraud detection alerts. Designed an intuitive dashboard displaying spending analytics and account summaries.',
    technologies: 'Java, Spring Boot, MySQL, Spring Security, React, REST API, JWT',
    coreFeature: 'secure transaction processing and account management',
    appType: 'financial management application'
  },
  {
    matches: ['inventory', 'management system', 'erp', 'crm'],
    description: '{VERB} a {NAME} to automate tracking, reporting, and management of business resources. Implemented CRUD operations for items/entities, real-time stock alerts, report generation, and role-based user access. Integrated data visualization dashboards to provide actionable business insights.',
    technologies: 'Python, Django, PostgreSQL, React, Chart.js, Bootstrap, REST API',
    coreFeature: 'resource tracking, reporting, and role-based access management',
    appType: 'management system'
  },
  {
    matches: ['face', 'image', 'vision', 'ocr'],
    description: '{VERB} a {NAME} using computer vision techniques to detect, process, and analyze visual data in real time. Trained a deep learning model on labeled image datasets, achieving high accuracy in recognition tasks. Integrated the model into a web interface enabling live camera feed processing and result visualization.',
    technologies: 'Python, OpenCV, TensorFlow, Keras, NumPy, Flask, HTML/CSS, JavaScript',
    coreFeature: 'image preprocessing, model training, and real-time inference',
    appType: 'computer vision application'
  },
  {
    matches: ['scraper', 'scraping', 'crawler', 'data collect'],
    description: '{VERB} a {NAME} to automate extraction of structured data from web sources at scale. Implemented dynamic page handling with headless browsers, data cleaning pipelines, and automated scheduling. Stored extracted data in a structured database with an API layer for downstream consumption.',
    technologies: 'Python, BeautifulSoup, Scrapy, Selenium, PostgreSQL, Pandas, Flask',
    coreFeature: 'automated web data extraction and structured storage pipeline',
    appType: 'data collection tool'
  },
  {
    matches: ['social', 'network', 'connect', 'community'],
    description: '{VERB} a {NAME} allowing users to create profiles, share posts, follow others, and interact through comments and likes. Implemented real-time notifications, content feed algorithm, media uploads, and privacy settings. Built a responsive interface with infinite scroll and optimized API performance for high user concurrency.',
    technologies: 'React, Node.js, Express.js, MongoDB, Socket.io, JWT, Cloudinary, CSS',
    coreFeature: 'user interaction, content feed, and real-time notifications',
    appType: 'social networking platform'
  },
  {
    matches: ['student', 'education', 'school', 'learn', 'course'],
    description: '{VERB} a {NAME} to manage academic workflows including student enrollment, course registration, attendance tracking, and grade management. Implemented separate dashboards for students, faculty, and administrators with role-based permissions. Automated report generation and email notifications for academic events.',
    technologies: 'Java, Spring Boot, MySQL, React, Bootstrap, REST API, JUnit',
    coreFeature: 'student data management, course tracking, and automated reporting',
    appType: 'educational management system'
  },
  {
    matches: ['iot', 'smart', 'sensor', 'embedded', 'arduino'],
    description: '{VERB} a {NAME} integrating IoT sensors with a cloud platform to enable real-time monitoring and automated control. Implemented MQTT-based communication between devices, a time-series data storage layer, and a live dashboard for sensor data visualization and threshold-based alerts.',
    technologies: 'Python, Arduino, MQTT, Node.js, InfluxDB, Grafana, React, REST API',
    coreFeature: 'sensor data acquisition, real-time processing, and remote control',
    appType: 'IoT monitoring solution'
  },
  {
    matches: ['blockchain', 'crypto', 'nft', 'smart contract', 'defi'],
    description: '{VERB} a {NAME} on a blockchain network enabling decentralized, transparent, and tamper-proof transactions. Developed and deployed Solidity smart contracts, implemented wallet integration, and built a frontend interface for interacting with the blockchain. Ensured security through contract auditing and gas optimization.',
    technologies: 'Solidity, Ethereum, Web3.js, React, MetaMask, Hardhat, Node.js',
    coreFeature: 'smart contract development and decentralized transaction management',
    appType: 'blockchain application'
  }
];

const fallbackDomain = {
  description: '{VERB} a {NAME} to address real-world challenges through a robust full-stack solution. Designed and implemented core modules including data management, business logic, and a user-friendly interface. Followed best practices in software engineering including modular architecture, version control, and comprehensive testing to ensure reliability and maintainability.',
  technologies: 'Python / Java, HTML, CSS, JavaScript, MySQL / MongoDB, REST API, Git',
  coreFeature: 'core business logic, data management, and user interface',
  appType: 'software application'
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const projectName = String(req.body?.projectName || '').trim();

  if (!projectName) {
    return res.status(400).json({ error: 'Project name is required.' });
  }

  try {
    const webInfo = await searchWeb(projectName);
    const result = buildProjectDescription(projectName, webInfo);
    return res.status(200).json(result);
  } catch {
    const result = buildProjectDescription(projectName, '');
    return res.status(200).json(result);
  }
};

async function searchWeb(projectName) {
  const query = encodeURIComponent(`${projectName} project computer science`);
  const url = `https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 ResumeForge Serverless Function'
    }
  });

  if (!response.ok) return '';

  const data = await response.json();

  if (typeof data.Abstract === 'string' && data.Abstract.length > 30) {
    return data.Abstract;
  }

  if (Array.isArray(data.RelatedTopics)) {
    const topic = data.RelatedTopics.find((item) => (
      typeof item.Text === 'string' && item.Text.length > 30
    ));
    return topic?.Text || '';
  }

  return '';
}

function buildProjectDescription(projectName, webInfo) {
  const name = projectName.trim();
  const lower = name.toLowerCase();
  const domain = detectDomain(lower);
  const verb = pickVerb(lower);
  let description;

  if (webInfo && webInfo.length > 40) {
    const snippet = webInfo.length > 200 ? `${webInfo.slice(0, 200)}...` : webInfo;
    description = `${verb} a ${name} that ${snippet.toLowerCase().trimStart()} Implemented ${domain.coreFeature} with focus on performance and scalability. Delivered a fully functional ${domain.appType} solution with clean architecture and documentation.`;
  } else {
    description = domain.description.replaceAll('{NAME}', name).replaceAll('{VERB}', verb);
  }

  return {
    description: cleanDescription(description),
    technologies: domain.technologies
  };
}

function detectDomain(projectName) {
  return domainRules.find((domain) => domain.matches.some((keyword) => projectName.includes(keyword))) || fallbackDomain;
}

function pickVerb(projectName) {
  if (projectName.includes('system') || projectName.includes('platform')) return 'Engineered';
  if (projectName.includes('app') || projectName.includes('application')) return 'Built';
  if (projectName.includes('tool') || projectName.includes('utility')) return 'Developed';
  if (projectName.includes('model') || projectName.includes('network')) return 'Designed';
  if (projectName.includes('analysis') || projectName.includes('analytics')) return 'Implemented';
  return 'Developed';
}

function cleanDescription(description) {
  const cleaned = description.replace(/\s{2,}/g, ' ').trim();
  return cleaned.endsWith('.') ? cleaned : `${cleaned}.`;
}
