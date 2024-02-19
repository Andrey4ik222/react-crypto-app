/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useEffect, useState } from "react";
import { fakeFetchAssets } from "../api";
import { percentDiff } from "../helpers";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

const URL = "https://openapiv1.coinstats.app/coins";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "NVq4/XB8QlfjwVDKc4hsGuO0dOC1QP94Tr74379EY/k=",
  },
};

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDiff(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: +(
          asset.amount * coin.price -
          asset.amount * asset.price
        ).toFixed(2),
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function perload() {
      setLoading(true);
      try {
        const response = await fetch(URL, options);
        const result = await response.json();
        setCrypto(result.result);
        const assets = await fakeFetchAssets();
        setAssets(mapAssets(assets, result.result));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    perload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
