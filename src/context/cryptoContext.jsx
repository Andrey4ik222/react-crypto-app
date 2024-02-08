/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useEffect, useState } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDiff } from "../helpers";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

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
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function perload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fakeFetchAssets();

      setCrypto(result);
      setAssets(mapAssets(assets, result));

      setLoading(false);
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
