// To parse this data:
//
//   import { Convert, Movie } from "./file";
//
//   const movie = Convert.toMovie(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Movie {
  adult?:                 boolean;
  alternative_titles?:    AlternativeTitle[];
  backdrop_path?:         string;
  belongs_to_collection?: BelongsToCollection;
  budget?:                number;
  cast?:                  Cast[];
  credits?:               Credits;
  crew?:                  Crew[];
  genres?:                Genre[];
  homepage?:              string;
  id?:                    number;
  images?:                Images;
  imdb_id?:               string;
  keywords?:              Genre[];
  lists?:                 List[];
  mediaType?:             string;
  original_language?:     string;
  original_title?:        string;
  overview?:              string;
  popularity?:            number;
  poster_path?:           string;
  production_companies?:  Genre[];
  production_countries?:  ProductionCountry[];
  rating?:                number;
  release_date?:          string;
  releases?:              Release[];
  revenue?:               number;
  reviews?:               Review[];
  runtime?:               number;
  similar?:               null[];
  spoken_languages?:      SpokenLanguage[];
  status?:                string;
  tagline?:               string;
  title?:                 string;
  translations?:          Translation[];
  videos?:                Video[];
  vote_average?:          number;
  vote_count?:            number;
}

export interface AlternativeTitle {
  iso_3166_1?: string;
  title?:      string;
}

export interface BelongsToCollection {
  backdrop_path?: string;
  id?:            number;
  name?:          string;
  poster_path?:   string;
  release_date?:  string;
  title?:         string;
}

export interface Cast {
  cast_id?:      number;
  character?:    string;
  credit_id?:    string;
  id?:           number;
  name?:         string;
  order?:        number;
  profile_path?: string;
}

export interface Credits {
  all?:         All[];
  cast?:        Cast[];
  crew?:        Crew[];
  guest_stars?: Cast[];
  id?:          number;
}

export interface All {
  cast_id?:      number;
  credit_id?:    string;
  id?:           number;
  name?:         string;
  profile_path?: string;
}

export interface Crew {
  cast_id?:      number;
  credit_id?:    string;
  department?:   string;
  id?:           number;
  job?:          string;
  name?:         string;
  profile_path?: string;
}

export interface Genre {
  id?:   number;
  name?: string;
}

export interface Images {
  backdrops?: Backdrop[];
  id?:        number;
  posters?:   Backdrop[];
  profiles?:  Backdrop[];
  stills?:    Backdrop[];
}

export interface Backdrop {
  artworkType?:  string;
  aspect_ratio?: number;
  file_path?:    string;
  flag?:         string;
  height?:       number;
  iso_639_1?:    string;
  vote_average?: number;
  vote_count?:   number;
  width?:        number;
}

export interface List {
  created_by?:     string;
  description?:    string;
  favorite_count?: number;
  id?:             string;
  iso_639_1?:      string;
  item_count?:     number;
  items?:          null[];
  list_type?:      string;
  name?:           string;
  poster_path?:    string;
}

export interface ProductionCountry {
  iso_3166_1?: string;
  name?:       string;
}

export interface Release {
  iso_3166_1?:    string;
  release_dates?: ReleaseDate[];
}

export interface ReleaseDate {
  certification?: string;
  iso_639_1?:     string;
  note?:          string;
  release_date?:  string;
  type?:          string;
}

export interface Review {
  author?:  string;
  content?: string;
  id?:      string;
  url?:     string;
}

export interface SpokenLanguage {
  iso_639_1?: string;
  name?:      string;
}

export interface Translation {
  english_name?: string;
  iso_639_1?:    string;
  name?:         string;
}

export interface Video {
  id?:        string;
  iso_639_1?: string;
  key?:       string;
  name?:      string;
  site?:      string;
  size?:      number;
  type?:      string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export namespace Convert {
  export function toMovie(json: string): Movie {
    return cast(JSON.parse(json), r('Movie'));
  }

  export function movieToJson(value: Movie): string {
    return JSON.stringify(uncast(value, r('Movie')), null, 2);
  }

  function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
  }

  function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
    }
    return typ.jsonToJS;
  }

  function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
    }
    return typ.jsToJSON;
  }

  function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) { return val; }
      return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
        const typ = typs[i];
        try {
          return transform(val, typ, getProps);
        } catch (_) {}
      }
      return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) { return val; }
      return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) { return invalidValue('array', val); }
      return val.map(el => transform(el, typ, getProps));
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== 'object' || Array.isArray(val)) {
        return invalidValue('object', val);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
        const prop = props[key];
        const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
        result[prop.key] = transform(v, prop.typ, getProps);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(props, key)) {
          result[key] = transform(val[key], additional, getProps);
        }
      });
      return result;
    }

    if (typ === 'any') { return val; }
    if (typ === null) {
      if (val === null) { return val; }
      return invalidValue(typ, val);
    }
    if (typ === false) { return invalidValue(typ, val); }
    while (typeof typ === 'object' && typ.ref !== undefined) {
      typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) { return transformEnum(typ, val); }
    if (typeof typ === 'object') {
      return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
        : typ.hasOwnProperty('arrayItems')    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty('props')         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    return transformPrimitive(typ, val);
  }

  function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
  }

  function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
  }

  function a(typ: any) {
    return { arrayItems: typ };
  }

  function u(...typs: any[]) {
    return { unionMembers: typs };
  }

  function o(props: any[], additional: any) {
    return { props, additional };
  }

  function m(additional: any) {
    return { props: [], additional };
  }

  function r(name: string) {
    return { ref: name };
  }

  const typeMap: any = {
    'Movie': o([
      { json: 'adult', js: 'adult', typ: u(undefined, true) },
      { json: 'alternative_titles', js: 'alternative_titles', typ: u(undefined, a(r('AlternativeTitle'))) },
      { json: 'backdrop_path', js: 'backdrop_path', typ: u(undefined, '') },
      { json: 'belongs_to_collection', js: 'belongs_to_collection', typ: u(undefined, r('BelongsToCollection')) },
      { json: 'budget', js: 'budget', typ: u(undefined, 0) },
      { json: 'cast', js: 'cast', typ: u(undefined, a(r('Cast'))) },
      { json: 'credits', js: 'credits', typ: u(undefined, r('Credits')) },
      { json: 'crew', js: 'crew', typ: u(undefined, a(r('Crew'))) },
      { json: 'genres', js: 'genres', typ: u(undefined, a(r('Genre'))) },
      { json: 'homepage', js: 'homepage', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'images', js: 'images', typ: u(undefined, r('Images')) },
      { json: 'imdb_id', js: 'imdb_id', typ: u(undefined, '') },
      { json: 'keywords', js: 'keywords', typ: u(undefined, a(r('Genre'))) },
      { json: 'lists', js: 'lists', typ: u(undefined, a(r('List'))) },
      { json: 'mediaType', js: 'mediaType', typ: u(undefined, '') },
      { json: 'original_language', js: 'original_language', typ: u(undefined, '') },
      { json: 'original_title', js: 'original_title', typ: u(undefined, '') },
      { json: 'overview', js: 'overview', typ: u(undefined, '') },
      { json: 'popularity', js: 'popularity', typ: u(undefined, 0) },
      { json: 'poster_path', js: 'poster_path', typ: u(undefined, '') },
      { json: 'production_companies', js: 'production_companies', typ: u(undefined, a(r('Genre'))) },
      { json: 'production_countries', js: 'production_countries', typ: u(undefined, a(r('ProductionCountry'))) },
      { json: 'rating', js: 'rating', typ: u(undefined, 0) },
      { json: 'release_date', js: 'release_date', typ: u(undefined, '') },
      { json: 'releases', js: 'releases', typ: u(undefined, a(r('Release'))) },
      { json: 'revenue', js: 'revenue', typ: u(undefined, 0) },
      { json: 'reviews', js: 'reviews', typ: u(undefined, a(r('Review'))) },
      { json: 'runtime', js: 'runtime', typ: u(undefined, 0) },
      { json: 'similar', js: 'similar', typ: u(undefined, a(null)) },
      { json: 'spoken_languages', js: 'spoken_languages', typ: u(undefined, a(r('SpokenLanguage'))) },
      { json: 'status', js: 'status', typ: u(undefined, '') },
      { json: 'tagline', js: 'tagline', typ: u(undefined, '') },
      { json: 'title', js: 'title', typ: u(undefined, '') },
      { json: 'translations', js: 'translations', typ: u(undefined, a(r('Translation'))) },
      { json: 'videos', js: 'videos', typ: u(undefined, a(r('Video'))) },
      { json: 'vote_average', js: 'vote_average', typ: u(undefined, 0) },
      { json: 'vote_count', js: 'vote_count', typ: u(undefined, 0) },
    ], false),
    'AlternativeTitle': o([
      { json: 'iso_3166_1', js: 'iso_3166_1', typ: u(undefined, '') },
      { json: 'title', js: 'title', typ: u(undefined, '') },
    ], false),
    'BelongsToCollection': o([
      { json: 'backdrop_path', js: 'backdrop_path', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'poster_path', js: 'poster_path', typ: u(undefined, '') },
      { json: 'release_date', js: 'release_date', typ: u(undefined, '') },
      { json: 'title', js: 'title', typ: u(undefined, '') },
    ], false),
    'Cast': o([
      { json: 'cast_id', js: 'cast_id', typ: u(undefined, 0) },
      { json: 'character', js: 'character', typ: u(undefined, '') },
      { json: 'credit_id', js: 'credit_id', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'order', js: 'order', typ: u(undefined, 0) },
      { json: 'profile_path', js: 'profile_path', typ: u(undefined, '') },
    ], false),
    'Credits': o([
      { json: 'all', js: 'all', typ: u(undefined, a(r('All'))) },
      { json: 'cast', js: 'cast', typ: u(undefined, a(r('Cast'))) },
      { json: 'crew', js: 'crew', typ: u(undefined, a(r('Crew'))) },
      { json: 'guest_stars', js: 'guest_stars', typ: u(undefined, a(r('Cast'))) },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
    ], false),
    'All': o([
      { json: 'cast_id', js: 'cast_id', typ: u(undefined, 0) },
      { json: 'credit_id', js: 'credit_id', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'profile_path', js: 'profile_path', typ: u(undefined, '') },
    ], false),
    'Crew': o([
      { json: 'cast_id', js: 'cast_id', typ: u(undefined, 0) },
      { json: 'credit_id', js: 'credit_id', typ: u(undefined, '') },
      { json: 'department', js: 'department', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'job', js: 'job', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'profile_path', js: 'profile_path', typ: u(undefined, '') },
    ], false),
    'Genre': o([
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ], false),
    'Images': o([
      { json: 'backdrops', js: 'backdrops', typ: u(undefined, a(r('Backdrop'))) },
      { json: 'id', js: 'id', typ: u(undefined, 0) },
      { json: 'posters', js: 'posters', typ: u(undefined, a(r('Backdrop'))) },
      { json: 'profiles', js: 'profiles', typ: u(undefined, a(r('Backdrop'))) },
      { json: 'stills', js: 'stills', typ: u(undefined, a(r('Backdrop'))) },
    ], false),
    'Backdrop': o([
      { json: 'artworkType', js: 'artworkType', typ: u(undefined, '') },
      { json: 'aspect_ratio', js: 'aspect_ratio', typ: u(undefined, 0) },
      { json: 'file_path', js: 'file_path', typ: u(undefined, '') },
      { json: 'flag', js: 'flag', typ: u(undefined, '') },
      { json: 'height', js: 'height', typ: u(undefined, 0) },
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'vote_average', js: 'vote_average', typ: u(undefined, 0) },
      { json: 'vote_count', js: 'vote_count', typ: u(undefined, 0) },
      { json: 'width', js: 'width', typ: u(undefined, 0) },
    ], false),
    'List': o([
      { json: 'created_by', js: 'created_by', typ: u(undefined, '') },
      { json: 'description', js: 'description', typ: u(undefined, '') },
      { json: 'favorite_count', js: 'favorite_count', typ: u(undefined, 0) },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'item_count', js: 'item_count', typ: u(undefined, 0) },
      { json: 'items', js: 'items', typ: u(undefined, a(null)) },
      { json: 'list_type', js: 'list_type', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'poster_path', js: 'poster_path', typ: u(undefined, '') },
    ], false),
    'ProductionCountry': o([
      { json: 'iso_3166_1', js: 'iso_3166_1', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ], false),
    'Release': o([
      { json: 'iso_3166_1', js: 'iso_3166_1', typ: u(undefined, '') },
      { json: 'release_dates', js: 'release_dates', typ: u(undefined, a(r('ReleaseDate'))) },
    ], false),
    'ReleaseDate': o([
      { json: 'certification', js: 'certification', typ: u(undefined, '') },
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'note', js: 'note', typ: u(undefined, '') },
      { json: 'release_date', js: 'release_date', typ: u(undefined, '') },
      { json: 'type', js: 'type', typ: u(undefined, '') },
    ], false),
    'Review': o([
      { json: 'author', js: 'author', typ: u(undefined, '') },
      { json: 'content', js: 'content', typ: u(undefined, '') },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'url', js: 'url', typ: u(undefined, '') },
    ], false),
    'SpokenLanguage': o([
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ], false),
    'Translation': o([
      { json: 'english_name', js: 'english_name', typ: u(undefined, '') },
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ], false),
    'Video': o([
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'iso_639_1', js: 'iso_639_1', typ: u(undefined, '') },
      { json: 'key', js: 'key', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'site', js: 'site', typ: u(undefined, '') },
      { json: 'size', js: 'size', typ: u(undefined, 0) },
      { json: 'type', js: 'type', typ: u(undefined, '') },
    ], false),
  };
}
