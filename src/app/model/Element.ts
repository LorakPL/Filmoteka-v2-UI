export class Element {

  private id: String;
  private _polishTitle: String;
  private originalTitle: String;
  private _photoUrl: String;
  private cast: String;
  private year: String;
  private duration: String;
  private countries: String;
  private genre: String;
  private plot: String;
  private description: String;
  private episodes: String;
  private seasons: String;
  private type: String;

  constructor (id: String, polishTitle: String, originalTitle: String, photoUrl: String, cast: String, year: String, duration: String,
               countries: String, genre: String, plot: String, description: String, episodes: String, seasons: String, type: String) {
    this.id = id;
    this._polishTitle = polishTitle;
    this.originalTitle = originalTitle;
    this._photoUrl = photoUrl;
    this.cast = cast;
    this.year = year;
    this.duration = duration;
    this.countries = countries;
    this.genre = genre;
    this.plot = plot;
    this.description = description;
    this.episodes = episodes;
    this.seasons = seasons;
    this.type = type;
  }

  get polishTitle(): String {
    return this._polishTitle;
  }
  set polishTitle(polishTitle: String) {
    this._polishTitle = polishTitle;
  }

  get photoUrl(): String {
    return this._photoUrl;
  }
  set photoUrl(photoUrl: String) {
    this._photoUrl = photoUrl;
  }

  /*

  public getId(): String {
    return this.id;
  }

  public setId(id: String): void {
    this.id = id;
  }

  public getPolishTitle(): String {
    return this.polishTitle;
  }

  public setPolishTitle(polishTitle: String): void {
    this.polishTitle = polishTitle;
  }

  public getOriginalTitle(): String {
    return this.originalTitle;
  }

  public setOriginalTitle(originalTitle: String): void {
    this.originalTitle = originalTitle;
  }

  public getPhotoUrl(): String {
    return this.photoUrl;
  }

  public setPhotoUrl(photoUrl: String): void {
    this.photoUrl = photoUrl;
  }

  public getCast(): String {
    return this.cast;
  }

  public setCast(cast: String): void {
    this.cast = cast;
  }

  public getYear(): String {
    return this.year;
  }

  public setYear(year: String): void {
    this.year = year;
  }

  public getDuration(): String {
    return this.duration;
  }

  public setDuration(duration: String): void {
    this.duration = duration;
  }

  public getCountries(): String {
    return this.countries;
  }

  public setCountries(countries: String): void {
    this.countries = countries;
  }

  public getGenre(): String {
    return this.genre;
  }

  public setGenre(genre: String): void {
    this.genre = genre;
  }

  public getPlot(): String {
    return this.plot;
  }

  public setPlot(plot: String): void {
    this.plot = plot;
  }

  public getDescription(): String {
    return this.description;
  }

  public setDescription(description: String): void {
    this.description = description;
  }

  public getEpisodes(): String {
    return this.episodes;
  }

  public setEpisodes(episodes: String): void {
    this.episodes = episodes;
  }

  public getSeasons(): String {
    return this.seasons;
  }

  public setSeasons(seasons: String): void {
    this.seasons = seasons;
  }

  public getType(): String {
    return this.type;
  }

  public setType(type: String): void {
    this.type = type;
  }
  */
}
