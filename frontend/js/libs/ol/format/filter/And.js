/**
 * @module ol/format/filter/And
 */
import LogicalNary from '../filter/LogicalNary.js';

/**
 * @classdesc
 * Represents a logical `<And>` operator between two or more filter conditions.
 *
 * @abstract
 */
class And extends LogicalNary {

  /**
   * @param {...module:ol/format/filter/Filter} conditions Conditions.
   */
  constructor(conditions) {
    const params = ['And'].concat(Array.prototype.slice.call(arguments));
    super(...params);
  }

}

export default And;
