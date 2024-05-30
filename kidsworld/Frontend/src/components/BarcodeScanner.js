import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';
import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => { },
  onError = () => { },
} = {}) => {
  const ref = useRef(null);
  const navigate = useNavigate()
  const reader = useMemo(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) {
        console.log(result);
        alert("Scan successfull")
        navigate(`/product/${result.text[0]}`)
        onResult(result);
      }
      if (error) { console.log(error); onError(error) };
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref };
};


const BarcodeScanner = ({
  onResult = () => { },
  onError = () => { },
}) => {
  const { ref } = useZxing({ onResult, onError });
  return <video ref={ref} />;
};

export default BarcodeScanner;
