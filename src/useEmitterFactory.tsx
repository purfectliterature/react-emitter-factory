import { useEffect } from 'react';

const useEmitterFactory: EmitterFactory = (props, emitters, dependencies) => {
  useEffect(() => {
    props.emitsVia?.(emitters);
  }, dependencies ?? []);
};

export default useEmitterFactory;
