const CWE_LABELS = {
  "CWE-20": "Validation d'entrée incorrecte",
  "CWE-22": "Path traversal",
  "CWE-78": "Injection de commande OS",
  "CWE-79": "XSS",
  "CWE-89": "Injection SQL",
  "CWE-94": "Injection de code",
  "CWE-119": "Dépassement de tampon",
  "CWE-269": "Gestion des privilèges incorrecte",
  "CWE-287": "Authentification incorrecte",
  "CWE-306": "Authentification manquante",
  "CWE-416": "Use after free",
  "CWE-434": "Upload de fichier non restreint",
  "CWE-502": "Désérialisation non sûre",
  "CWE-787": "Écriture hors limites",
  "CWE-843": "Confusion de type",
};

export function topCwes(vulns, n = 10) {
  const counts = vulns
    .flatMap(v => v.cwes || [])
    .filter(cwe => cwe.startsWith("CWE-"))
    .reduce((acc, cwe) => {
      acc[cwe] = (acc[cwe] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(counts)
    .map(([cwe, count]) => ({
      cwe,
      label: CWE_LABELS[cwe] ? `${CWE_LABELS[cwe]} (${cwe})` : cwe,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}


export function addedByMonth(vulns, from = null) {
    const filtered = from
        ? vulns.filter(v => v.dateAdded.slice(0, 7) >= from)
        : vulns;

    const counts = filtered.reduce((acc, v) => {
        const month = v.dateAdded.slice(0, 7); 
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(counts)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => a.month.localeCompare(b.month));
}

export function ransomwareShare(vulns) {
  const known = vulns.filter(v => v.knownRansomwareCampaignUse === "Known").length;
  return [
    { name: "Utilisée par des ransomwares", value: known },
    { name: "Pas d'usage connu", value: vulns.length - known },
  ];
}

function daysBetween(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

const DELAY_BUCKETS = [
  { label: "≤ 7 j", max: 7 },
  { label: "8–14 j", max: 14 },
  { label: "15–21 j", max: 21 },
  { label: "22–30 j", max: 30 },
  { label: "31–90 j", max: 90 },
  { label: "> 90 j", max: Infinity },
];

export function remediationDelays(vulns) {
  const counts = DELAY_BUCKETS.map(b => ({ label: b.label, count: 0 }));

  for (const v of vulns) {
    if (!v.dateAdded || !v.dueDate) continue;
    const days = daysBetween(v.dateAdded, v.dueDate);
    const index = DELAY_BUCKETS.findIndex(b => days <= b.max);
    counts[index].count += 1;
  }

  return counts;
}

export function ransomwareByVendor(vulns, n = 10) {
  const byVendor = vulns.reduce((acc, v) => {
    const name = v.vendorProject;
    if (!acc[name]) {
      acc[name] = { vendor: name, ransomware: 0, other: 0 };
    }
    if (v.knownRansomwareCampaignUse === "Known") {
      acc[name].ransomware += 1;
    } else {
      acc[name].other += 1;
    }
    return acc;
  }, {});

  return Object.values(byVendor)
    .sort((a, b) => (b.ransomware + b.other) - (a.ransomware + a.other))
    .slice(0, n);
}

export function cumulativeByMonth(vulns) {
  let total = 0;
  return addedByMonth(vulns).map(({ month, count }) => {
    total += count;
    return { month, total };
  });
}

export function topProducts(vulns, n = 10) {
  const counts = vulns.reduce((acc, v) => {
    const key = `${v.vendorProject} ${v.product}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

export function ransomwareByYear(vulns) {
  const byYear = vulns.reduce((acc, v) => {
    const year = v.dateAdded.slice(0, 4);
    if (!acc[year]) {
      acc[year] = { year, total: 0, ransomware: 0 };
    }
    acc[year].total += 1;
    if (v.knownRansomwareCampaignUse === "Known") {
      acc[year].ransomware += 1;
    }
    return acc;
  }, {});

  return Object.values(byYear)
    .sort((a, b) => a.year.localeCompare(b.year))
    .map(y => ({ ...y, rate: Math.round((y.ransomware / y.total) * 100) }));
}

export function vendorProfiles(vulns, minTotal = 5) {
  return ransomwareByVendor(vulns, Infinity)
    .map(v => {
      const total = v.ransomware + v.other;
      return {
        vendor: v.vendor,
        total,
        rate: Math.round((v.ransomware / total) * 100),
      };
    })
    .filter(v => v.total >= minTotal);
}