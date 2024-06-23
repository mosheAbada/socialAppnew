import React from 'react';

export default function Title({ getTitle }) {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4 text-blue-700">{getTitle}</h1>
    </div>
  );
}
