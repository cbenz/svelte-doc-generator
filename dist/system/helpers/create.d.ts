import Base from '../base/Base';
/**
 * Models factory.
 * Create an instance of the model and configure it.
 * Set configuration data after constructor properties initialization.
 * So we can override default class properties with configuration.
 */
export default function create<C>(model: Base<C>): typeof model;
