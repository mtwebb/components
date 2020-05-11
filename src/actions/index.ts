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

import { State } from "../state";
import * as AddTo from "./add-to";
import * as Draw from "./draw";
import * as Data from "./data";
import * as Opts from "./opts";
import * as Raise from "./raise";
import * as Create from "./create";
import * as Shuffle from "./shuffle";

export type Action =
  | AddTo.Action
  | Create.Action
  | Data.Action
  | Draw.Action
  | Opts.Action
  | Raise.Action
  | Shuffle.Action;

function assertNever(action: never): never {
  throw new Error(`unexpected action: ${JSON.stringify(action)}`);
}

export function ApplyActionsToState(state: State, actions: Array<Action>) {
  return actions.reduce(_ApplyActionToState, state);
}

function _ApplyActionToState(state: State, action: Action) {
  switch (action.kind) {
    case "add-to":
      return AddTo.Apply(state, action);

    case "create":
      return Create.Apply(state, action);

    case "data":
      return Data.Apply(state, action);

    case "draw":
      return Draw.Apply(state, action);

    case "opts":
      return Opts.Apply(state, action);

    case "raise":
      return Raise.Apply(state, action);

    case "shuffle":
      return Shuffle.Apply(state, action);

    default:
      return assertNever(action);
  }
}
