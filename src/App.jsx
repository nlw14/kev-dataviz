import { useMemo, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import kev from "./data/known_exploited_vulnerabilities.json";
import AddedByMonthChart from "./components/AddedByMonthChart";
import RansomwareChart from "./components/RansomwareChart";
import DelaysChart from "./components/DelaysChart";
import RansomwareByVendorChart from "./components/RansomwareByVendorChart";
import CumulativeChart from "./components/CumulativeChart";
import RankingChart from "./components/RankingChart";
import RansomwareByYearChart from "./components/RansomwareByYearChart";
import VendorProfileChart from "./components/VendorProfileChart";
import { addedByMonth, ransomwareShare, topCwes, remediationDelays, ransomwareByVendor, cumulativeByMonth, topProducts, ransomwareByYear, vendorProfiles } from "./utils/stats";


export default function App() {
  const [startMonth, setStartMonth] = useState("2022-07");
  const [topN, setTopN] = useState(10);

  const { theme, toggleTheme } = useTheme();

  const vulns = kev.vulnerabilities;
  const monthly = useMemo(() => addedByMonth(vulns, startMonth), [vulns, startMonth]);
  const ransomware = useMemo(() => ransomwareShare(vulns), [vulns]);
  const cwes = useMemo(() => topCwes(vulns), [vulns]);
  const delays = useMemo(() => remediationDelays(vulns), [vulns])
  const ransomwareVendors = useMemo(() => ransomwareByVendor(vulns, topN),[vulns, topN]);
  const cumulative = useMemo(() => cumulativeByMonth(vulns), [vulns]);
  const products = useMemo(() => topProducts(vulns), [vulns]);
  const yearly = useMemo(() => ransomwareByYear(vulns), [vulns]);
  const profiles = useMemo(() => vendorProfiles(vulns), [vulns]);

  return (
    <main style={{ width: "100%"}}>
      <div style={{ margin : 25 }}>
        <h1>CISA KEV – Vulnérabilités exploitées</h1>
        <p>
          {vulns.length} vulnérabilités · version {kev.catalogVersion}
        </p>

        <button onClick={toggleTheme}>
          {theme === "dark" ? "Thème clair" : "Thème sombre"}
        </button>

        <div style={{ display : "flex", width : "100%"}}>
          <div style={{ display : "flex", flexDirection : "column", width : "40%" }} className="chart">
            <h2>Top {topN} des éditeurs</h2>
            <p style={{ marginTop : 0 }}>Lien avec les ransomwares, par éditeur</p>
            <label>
              Nombre d'éditeurs :{" "}
              <input
                type="number"
                min={1}
                max={19}
                value={topN}
                onChange={(e) => setTopN(Number(e.target.value))}
              />
            </label>
            <RansomwareByVendorChart data={ransomwareVendors} />
          </div>

          <div style={{ display : "flex", flexDirection : "column", width : "60%" }}>
            <div className="chart">
              <h2>Ajouts au catalogue par mois</h2>
              <label style={{ marginBottom : 20 }}>
                Afficher à partir de :{" "}
                <input
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                />
              </label>
              <AddedByMonthChart data={monthly} />
            </div>

            <div className="chart">
              <RansomwareChart data={ransomware} />
            </div>
          </div>
        </div>

    
        <div style={{ display : "flex", width : "100%"}}>
          <div style={{ display : "flex", flexDirection : "column", width : "40%" }} className="chart">
            <h2>Délai de correction imposé</h2>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              Nombre de jours entre l'ajout au catalogue et la date limite de correction
              fixée aux agences fédérales américaines.
            </p>
            <DelaysChart data={delays} />
          </div>

          <div style={{ display : "flex", flexDirection : "column", width : "60%" }} className="chart">
            <h2 style={{ marginBottom : 70 }}>Taille du catalogue au fil du temps</h2>
            <CumulativeChart data={cumulative} />
          </div>
        </div>

        <div className="chart">
          <h2>Produits les plus touchés</h2>
          <RankingChart data={products} color="#ea580c" seriesName="Vulnérabilités" />
        </div>

        <div style={{ marginTop : 10 }} className="chart">
          <h2>Types de faiblesses les plus fréquents</h2>
          <RankingChart data={cwes} color="#0891b2" seriesName="Occurrences" labelWidth={260} />
        </div>

        <div style={{ display : "flex", width : "100%"}}>
          <div style={{ display : "flex", flexDirection : "column", width : "25%" }} className="chart">
            <h2 style={{ marginBottom : 50 }}>Évolution annuelle et part des ransomwares</h2>
            <RansomwareByYearChart data={yearly} />
          </div>

          <div style={{ display : "flex", flexDirection : "column", width : "75%" }} className="chart">
            <h2>Profil des éditeurs</h2>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              Éditeurs ayant au moins 5 vulnérabilités au catalogue.
            </p>
            <VendorProfileChart data={profiles} />
          </div>
        </div>
      </div>
    </main>
  );
}