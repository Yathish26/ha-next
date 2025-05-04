"use client";
import React, { useEffect, useState } from 'react'

export default function CryptoWidget() {
    const [cryptoRates, setCryptoRates] = useState(null);
    const popularCryptos = [
        { id: "bitcoin", symbol: "BTC", icon: "₿" },
        { id: "ethereum", symbol: "ETH", icon: "Ξ" },
    ];

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
            .then((response) => response.json())
            .then((data) => {
                const formattedRates = popularCryptos.reduce((acc, crypto) => {
                    if (data[crypto.id]) {
                        acc[crypto.id] = data[crypto.id].usd;
                    }
                    return acc;
                }, {});
                setCryptoRates(formattedRates);
            })
            .catch((error) => console.error("Error fetching crypto rates:", error));
    }, []);

    return (
        <div>
            <h1 className="text-[2rem] font-semibold my-6">
                Crypto Prices on {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </h1>
            <div className="gap-4 grid grid-cols-2 mo:grid-cols-2">
                {cryptoRates ? (
                    popularCryptos.map(({ id, symbol, icon }) => (
                        <div key={id} className="w-fit h-fit bg-[#EECDFF] mo:bg-[#E7B7FF] p-4 rounded-xl flex flex-col gap-4">
                            <p className="font-semibold font-spartan">{symbol}</p>
                            <div className="flex gap-4">
                                <p className="text-3xl font-semibold">${cryptoRates[id].toFixed(2)}</p>
                                <p className="text-3xl font-semibold">{icon}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="font-semibold">Loading...</p>
                )}
            </div>
        </div>
    )
}
