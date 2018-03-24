export default class Member {
  constructor(attr) {
    this._attr = attr
  }

  get id() {
    return this._attr.id
  }

  get rating() {
    return this._attr.rating
  }

  set rating(rating) {
    this._attr.rating = rating
  }
}
