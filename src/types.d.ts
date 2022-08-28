type BasicEmitter = { [key: string]: any };

type Binder<Emitter> = (emitter: Emitter) => void;

type EmitterFactory = <Emitter extends BasicEmitter>(
  props: Emitting<Emitter>,
  emitters: Emitter,
  dependencies?: React.DependencyList,
) => void;

interface Emitting<Emitter extends BasicEmitter> {
  emitsVia?: Binder<Emitter>;
}
