type EventHandler<T = any> = (payload: T) => void;

class EventEmitter {
	#events = new Map();
	constructor(pool?: any) {
		if (pool) this.#events = pool;
	}

	on<T>(event: string, callback: EventHandler<T>) {
		const callbacks = this.#events.get(event) || [];
		callbacks.push(callback);
		this.#events.set(event, callbacks);
		return () => this.off(event, callback);
	}
	off<T>(event: string, callback: EventHandler<T>) {
		const callbacks = this.#events.get(event);
		if (callbacks) {
			this.#events.set(
				event,
				//@ts-ignore
				callbacks.filter(cb => cb !== callback)
			);
		}
	}

	emit<T>(event: string, ...args: T[]) {
		const callbacks = this.#events.get(event);
		//@ts-ignore
		callbacks?.forEach(cb => cb(...args));
	}

	once<T>(event: string, callback: EventHandler<T>) {
		const wrapper: EventHandler<T> = payload => {
			callback(payload);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
	}
}

export default new EventEmitter();
