import { useEffect, DependencyList } from 'react';

type BasicEmitter = { [key: string]: any };

type Binder<Emitter> = (emitter: Emitter) => void;

type EmitterFactory = <Emitter extends BasicEmitter>(
  props: Emits<Emitter>,
  emitters: Emitter,
  dependencies?: DependencyList,
) => void;

export interface Emitting<Emitter extends BasicEmitter> {
  emitsVia?: Binder<Emitter>;
}

const useEmitterFactory: EmitterFactory = (props, emitters, dependencies) => {
  useEffect(() => {
    props.emitsVia?.(emitters);
  }, dependencies ?? []);
};

export default useEmitterFactory;
