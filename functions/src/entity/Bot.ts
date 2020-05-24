export interface BotPropertiesType {
  name: string;
  title: string;
  icon: string;
  desc: string;
  type: string;
  url: string;
  responseType: string;
  parameterEnabled: boolean;
  typeAheadEnabled: boolean;
  typeAheadOptions: string[];
  author: string;
}

export enum ResponseTypesEnum {
  ListOfImages = "ListOfImages",
  ListOfGifs = "ListOfGifs",
  ListOfLinks = "ListOfLinks",
  ListOfText = "ListOfText",
  Command = "Command",
}

export class Bot implements BotPropertiesType {
  public name: string;
  public title: string;
  public icon: string;
  public desc: string;
  public type: string;
  public url: string;
  public responseType: string;
  public parameterEnabled: boolean;
  public typeAheadEnabled: boolean;
  public typeAheadOptions: string[];
  public author: string;

  constructor(
    name: string,
    responseType: ResponseTypesEnum,
    url: string,
    author: string,
    title?: string,
    icon?: string,
    desc?: string,
    parameterEnabled?: boolean,
    typeAheadEnabled?: boolean,
    typeAheadOptions?: string[]
  ) {
    this.name = name;
    this.responseType = responseType;
    this.url = url;
    this.type = "cloud";
    this.title = title || name;
    this.icon = icon || "fas fa-globe-africa";
    this.desc = desc || "";
    this.parameterEnabled = parameterEnabled || false;
    this.typeAheadOptions = typeAheadOptions || [];
    if (this.typeAheadOptions.length > 0 && typeAheadEnabled) {
      this.typeAheadEnabled = true;
    } else {
      this.typeAheadEnabled = false;
    }
    this.author = author;
  }
}
