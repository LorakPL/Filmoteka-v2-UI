export class Item {

  private _filmwebId: String;
  private _originalTitle: String;
  private _polishTitle: String;
  private _image_0: String;
  private _image_1: String;
  private _image_2: String;
  private _image_3: String;
  private _image_4: String;
  private _image_5: String;
  private _image_6: String;
  private _year: String;
  private _cast: String;
  private _duration: String;
  private _countries: String;
  private _genre: String;
  private _description: String;
  private _plot: String;
  private _numberOfEpisodes: String;
  private _numberOfSeasons: String;
  private _type: String;

  constructor(filmwebId: String, originalTitle: String, polishTitle: String, image_0: String, image_1: String, image_2: String,
              image_3: String, image_4: String, image_5: String, image_6: String, year: String, cast: String, duration: String,
              countries: String, genre: String, description: String, plot: String, numberOfEpisodes: String,
              numberOfSeasons: String, type: String) {
    this._filmwebId = filmwebId;
    this._originalTitle = originalTitle;
    this._polishTitle = polishTitle;
    this._image_0 = image_0;
    this._image_1 = image_1;
    this._image_2 = image_2;
    this._image_3 = image_3;
    this._image_4 = image_4;
    this._image_5 = image_5;
    this._image_6 = image_6;
    this._year = year;
    this._cast = cast;
    this._duration = duration;
    this._countries = countries;
    this._genre = genre;
    this._description = description;
    this._plot = plot;
    this._numberOfEpisodes = numberOfEpisodes;
    this._numberOfSeasons = numberOfSeasons;
    this._type = type;
  }

  get filmwebId(): String {
    return this._filmwebId;
  }

  set filmwebId(filmwebId: String) {
    this._filmwebId = filmwebId;
  }

  get originalTitle(): String {
    return this._originalTitle;
  }
  set originalTitle(originalTitle: String) {
    this._originalTitle = originalTitle;
  }

  get polishTitle(): String {
    return this._polishTitle;
  }
  set polishTitle(polishTitle: String) {
    this._polishTitle = polishTitle;
  }

  get image_0(): String {
    return this._image_0;
  }
  set image_0(image_0: String) {
    this._image_0 = image_0;
  }

  get image_1(): String {
    return this._image_1;
  }
  set image_1(image_1: String) {
    this._image_1 = image_1;
  }

  get image_2(): String {
    return this._image_2;
  }
  set image_2(image_2: String) {
    this._image_2 = image_2;
  }

  get image_3(): String {
    return this._image_3;
  }
  set image_3(image_3: String) {
    this._image_3 = image_3;
  }

  get image_4(): String {
    return this._image_4;
  }
  set image_4(image_4: String) {
    this._image_4 = image_4;
  }

  get image_5(): String {
    return this._image_5;
  }
  set image_5(image_5: String) {
    this._image_5 = image_5;
  }

  get image_6(): String {
    return this._image_6;
  }
  set image_6(image_6: String) {
    this._image_6 = image_6;
  }

  get year(): String {
    return this._year;
  }
  set year(year: String) {
    this._year = year;
  }

  get cast(): String {
    return this._cast;
  }
  set cast(cast: String) {
    this._cast = cast;
  }

  get duration(): String {
    return this._duration;
  }
  set duration(duration: String) {
    this._duration = duration;
  }

  get countries(): String {
    return this._countries;
  }
  set countries(countries: String) {
    this._countries = countries;
  }

  get genre(): String {
    return this._genre;
  }
  set genre(genre: String) {
    this._genre = genre;
  }

  get description(): String {
    return this._description;
  }
  set description(description: String) {
    this._description = description;
  }

  get plot(): String {
    return this._plot;
  }
  set plot(plot: String) {
    this._plot = plot;
  }

  get numberOfEpisodes(): String {
    return this._numberOfEpisodes;
  }
  set numberOfEpisodes(numberOfEpisodes: String) {
    this._numberOfEpisodes = numberOfEpisodes;
  }

  get numberOfSeasons(): String {
    return this._numberOfSeasons;
  }
  set numberOfSeasons(numberOfSeasons: String) {
    this._numberOfSeasons = numberOfSeasons;
  }

  get type(): String {
    return this._type;
  }
  set type(type: String) {
    this._type = type;
  }
}
