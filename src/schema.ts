/*
 * Copyright 2020 Nicolo John Davis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Component } from "./types";

// The Schema object contains the specifications of various
// objects in a particular game.  It does not change in
// value through the course of the game.  It is
// generated by the Editor and interpreted by the Renderer
// in order to generate the graphics on the frontend.

export interface Schema {
  assets: {
    [id: string]: Asset.Entry;
  };

  templates: {
    [id: string]: Template.Entry;
  };

  objects: {
    [id: string]: GameObject.Entry;
  };
}

export namespace Asset {
  export type ID = string;

  export interface Entry {
    id: ID;
    name: string;
    url: string;
  }
}

export namespace Template {
  export type ID = string;

  export interface Entry {
    // CARD / SNAP_POINT etc.
    type: Component;

    // width / height of the component.
    geometry: Geometry;

    // Any shapes that need to be rendered inside the template.
    // These are created using the Boardgame Lab editor.
    parts?: Part.Map;

    // The order in which these parts have to be rendered.
    partOrder?: Part.ID[];

    // Any placeholders that are meant to be filled in by
    // components that derive from this template.
    placeholders?: {};
  }

  export interface Geometry {
    width: number;
    height: number;
  }

  export namespace Part {
    export type ID = string;

    interface Box {
      type: "box";
      id: ID;
      x: number;
      y: number;
      width: number;
      height: number;
      fill: string;
      stroke: string;
    }

    interface Circle {
      type: "circle";
      id: ID;
      x: number;
      y: number;
      width: number;
      height: number;
      fill: string;
      stroke: string;
    }

    interface Text {
      type: "text";
      id: ID;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      fontSize: number;
      bold?: boolean;
      italic?: boolean;
    }

    interface Image {
      type: "image";
      assetID: Asset.ID;
      id: ID;
      x: number;
      y: number;
      width: number;
      height: number;
    }

    export type Entry = Box | Circle | Text | Image;

    export type Map = {
      [id: string]: Entry;
    };
  }
}

export namespace GameObject {
  export interface Entry {
    templateID: Template.ID;
    data?: KeyValue<any>;
    opts?: KeyValue<any>;
    template: {
      placeholders?: {};
    };
  }
}

export interface KeyValue<T> {
  [key: string]: T;
}
