"use client";

import React, { useState } from "react";

const artists = [
    {
        "table": "Table 1",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 2",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 3",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 4",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 5",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 6",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 7",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    },
    {
        "table": "Table 8",
        "picture": "/favicon.ico",
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris eros, dignissim pulvinar mauris ac, lacinia varius ligula.",
        "members": "Member A, Member B"
    }
]

export function Artist(table: string, picture: string, description: string, members: string){
    return(
        <section className="section">
            <img src={picture} alt={`${table} logo`} className="w-32 h-32 object-contain mb-2" />
            <h3 className="section-title">
                {table}
            </h3>
            <p className="">
                {description}
            </p>
            <p className="">
                {members}
            </p>
        </section>
    )
}

export default function artistAlley() {
    const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

    const toggleArtist = (tableName: string) => {
        setExpandedArtist(expandedArtist === tableName ? null : tableName);
    };
    return(
        <main className="page gap-8">
            <section className="section">
                <h2 className="section-title">
                    Artist Alley
                </h2>
                <div className="">
                    The artist alley is a staple in many anime and comic 
                    conventions in general. They are a great way for 
                    independent artists to showcase and sell their products
                    directly to fans. 
                </div>
                </section>
            <section className="section">
                <h2 className="section-title">
                    Artists
                </h2>
            <div className="grid grid-cols-1 gap-8">
                {artists.map((artist) => {
                    return (
                        <React.Fragment key={artist.table}>
                            <div key={artist.table} className="rounded-lg border-2 border-gray-200 shadow-gray-200 shadow-md overflow-hidden hover:shadow-xl transition-shadow flex transition-all duration-300" onClick={() => toggleArtist(artist.table)}>
                            {expandedArtist !== artist.table && (
                                    <img
                                        src={artist.picture}
                                        alt={`${artist.table} logo`}
                                        className="w-1/3 h-full object-cover flex-shrink-0 transition-all duration-400"
                                    />
                                )}
                            
                            <div className="p-6 flex flex-col justify-between flex-grow transition-all duration-400">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            {artist.table}
                                        </h3>
                                        <span className="text-gray-500 transition-transform duration-400">
                                            {expandedArtist === artist.table ? '▼' : '▶'}
                                        </span>
                                    </div>
                                    <div className="border-t pt-3">
                                    <p className="text-sm text-gray-500 font-medium">
                                        Members: <span className="text-gray-700">{artist.members}</span>
                                    </p>
                                    </div>
                                    
                                    <div className={`overflow-hidden transition-all duration-200 ${
                                            expandedArtist === artist.table 
                                                ? 'max-h-96 opacity-100' 
                                                : 'max-h-0 opacity-0'
                                        }`}>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {artist.description}
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </React.Fragment>
                    );
                })};
            </div>
            </section>
        </main>
    )
}