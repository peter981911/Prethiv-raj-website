export const projectsData = [
    {
        id: "ngo-relief-system",
        title: "NGO Relief Distribution System",
        description: "A cloud-based system to manage and track relief distribution for NGOs. Enables efficient beneficiary management, real-time data updates, and transparent resource allocation.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Cloud Platforms"],
        image: "/projects/ngo_system.png",
        github: "https://github.com/peter981911/Aidtrack",
        external: "https://aidtrack-sage.vercel.app",
        caseStudy: {
            problem: "During crisis operations, NGOs struggle with disjointed Excel sheets and duplicate beneficiary claims, leading to severe resource misallocation.",
            architecture: "Implemented a monolithic MERN stack architecture, optimized for high write loads. Used role-based access control (RBAC) to separate Admin, Volunteer, and Beneficiary views. Cloud deployment ensured 99.9% uptime during surge traffic.",
            learnings: "Mastered building secure RESTful APIs, handling asynchronous database transactions, and designing responsive interfaces under strict operational constraints."
        },
        liveCode: {
            language: "javascript",
            initialCode: `// Allocate Resources to Beneficiaries\nasync function distributeRelief(batchId) {\n  const session = await mongoose.startSession();\n  session.startTransaction();\n  try {\n    const batch = await Inventory.reserve(batchId, session);\n    await Beneficiary.updateMany({ zone: batch.zone }, \n      { $inc: { received: 1 } }, { session });\n    await session.commitTransaction();\n    return { status: 'success', distributedCount: batch.size };\n  } catch (err) {\n    await session.abortTransaction();\n    throw err;\n  }\n}`,
            mockOutput: "{ status: 'success', distributedCount: 450 }\n[Inventory] Database consistency maintained via atomic transaction."
        }
    },
    {
        id: "web-vuln-scanner",
        title: "Web Vulnerability Scanner (Contributor)",
        description: "A web-based security tool to identify common application vulnerabilities such as SQL injection, XSS, and insecure headers, improving secure coding practices.",
        tech: ["Python", "Flask", "BeautifulSoup", "Requests", "Security Auditing"],
        image: "/projects/web_scanner.png",
        caseStudy: {
            problem: "Small to medium businesses lack affordable, automated initial security reconnaissance tools to quickly identify low-hanging-fruit vulnerabilities like exposed headers or basic XSS vulnerabilities.",
            architecture: "Built a Python/Flask backend that orchestrates automated, non-destructive payloads using multi-threading. The engine parses HTML DOM trees and inspects HTTP response headers, scoring the target against OWASP Top 10 guidelines.",
            learnings: "Deepened understanding of application security vectors, web scraping mechanics, concurrent execution in Python, and generating actionable security reports."
        },
        liveCode: {
            language: "python",
            initialCode: `import requests\nimport threading\n\ndef scan_headers(url):\n    # Simulate sending a diagnostic request\n    print(f"[*] Scanning {url} for missing security headers...")\n    response = requests.get(url)\n    headers = response.headers\n    \n    vulnerabilities = []\n    if 'X-Frame-Options' not in headers:\n        vulnerabilities.append('Missing X-Frame-Options (Clickjacking Risk)')\n    if 'Strict-Transport-Security' not in headers:\n        vulnerabilities.append('Missing HSTS (Downgrade Attack Risk)')\n        \n    return vulnerabilities\n\n# Run simulation\nscan_headers('http://target-application.local')`,
            mockOutput: "[*] Scanning http://target-application.local for missing security headers...\n\n[WARNING] Found 2 potential issues:\n - Missing X-Frame-Options (Clickjacking Risk)\n - Missing HSTS (Downgrade Attack Risk)"
        }
    },
    {
        id: "ayiram-finance-tracker",
        title: "Ayiram (Finance Tracker) (Contributor)",
        description: "A mobile personal finance tracking application. Provides a structured way to record transactions, categorize spending, and visualize activity for better budgeting.",
        tech: ["C#", ".NET", "Entity Framework Core"],
        image: "/projects/ayiram.png",
        caseStudy: {
            problem: "Most finance trackers are cluttered with ads and complex features. Users needed a minimalist, high-performance local ledger that respected data privacy while offering deep categorized insights.",
            architecture: "Leveraged C# and .NET with Entity Framework Core for robust data mapping. Implemented the Repository Design Pattern to abstract database operations. Used SQL Server for reliable relational transaction tracking.",
            learnings: "Gained hands-on experience in strongly-typed enterprise development, dependency injection, relational database schema design, and LINQ queries."
        },
        liveCode: {
            language: "javascript",
            initialCode: `// Using LINQ to query highest expense categories (Simulated in JS array methods)\nconst transactions = [\n  { amount: 15.50, category: "Food" },\n  { amount: 120.00, category: "Utilities" },\n  { amount: 45.00, category: "Food" },\n  { amount: 60.00, category: "Transport" }\n];\n\nconst analyzeSpending = (data) => {\n  return data.reduce((acc, curr) => {\n    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;\n    return acc;\n  }, {});\n};\n\nanalyzeSpending(transactions);`,
            mockOutput: "// Calculated Category Totals:\n{\n  Food: 60.50,\n  Utilities: 120.00,\n  Transport: 60.00\n}"
        }
    }
];
