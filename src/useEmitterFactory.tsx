import { useEffect, DependencyList } from 'react';

type BasicEmitter = { [key: string]: any };

type Binder<Emitter> = (emitter: Emitter) => void;

type EmitterFactory = <Emitter extends BasicEmitter>(
  props: Emits<Emitter>,
  emitters: Emitter,
  dependencies?: DependencyList,
) => void;

/**
 * An interface for components that emit emitters. Adds an `emitsVia?` prop.
 *
 * `extends` this interface on the props interface of the component that
 * `useEmitterFactory`.
 *
 * @example
 * interface Navigation extends Emits<Navigator> { ... }
 *
 * interface Navigator {
 *   scrollBy: (n: number) => void;
 *   scrollToTop: () => void;
 * }
 */
export interface Emits<Emitter extends BasicEmitter> {
  /**
   * Provide the method that binds this component's emitter to your component.
   *
   * @example
   * import Navigation, { Navigator } from '...';
   *
   * const [navigator, setNavigator] = useState<Navigator>();
   * <Navigation emitsVia={setNavigator} ... />
   */
  emitsVia?: Binder<Emitter>;
}

/**
 * Attaches your emitters after this component's render, just like a factory!
 * @param props This component's `props`. Must extends `Emits<YourEmitter>`.
 * @param emitters Implementations of `YourEmitter` to emit to the client.
 * @param dependencies If present, the factory will only run when values
 * in this array changes. Otherwise, it will only run once after render.
 */
const useEmitterFactory: EmitterFactory = (props, emitters, dependencies) => {
  useEffect(() => {
    props.emitsVia?.(emitters);
  }, dependencies ?? []);
};

export default useEmitterFactory;
