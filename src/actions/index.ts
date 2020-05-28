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
import * as Flip from "./flip";
import * as Data from "./data";
import * as Delete from "./delete";
import * as Noop from "./noop";
import * as Position from "./position";
import * as Raise from "./raise";
import * as Create from "./create";
import * as Shuffle from "./shuffle";
import * as Seat from "./seat";

export type Action =
  | AddTo.Action
  | Create.Action
  | Data.Action
  | Delete.Action
  | Flip.Action
  | Noop.Action
  | Position.Action
  | Raise.Action
  | Shuffle.Action
  | Seat.Action;

export function ApplyActionsToState(
  state: State,
  actions: Array<Action>,
  remote?: boolean
) {
  let newState = actions.reduce(_ApplyActionToState, state);
  newState.latestActions = actions;
  if (remote) {
    newState.remote = true;
  }
  return newState;
}

function _ApplyActionToState(state: State, action: Action) {
  switch (action.kind) {
    case "add-to":
      return AddTo.Apply(state, action);

    case "create":
      return Create.Apply(state, action);

    case "data":
      return Data.Apply(state, action);

    case "delete":
      return Delete.Apply(state, action);

    case "flip":
      return Flip.Apply(state, action);

    case "noop":
      return Noop.Apply(state, action);

    case "position":
      return Position.Apply(state, action);

    case "raise":
      return Raise.Apply(state, action);

    case "shuffle":
      return Shuffle.Apply(state, action);

    case "seat/create":
    case "seat/delete":
      return Seat.Apply(state, action);

    default:
      return assertNever(action);
  }
}

function assertNever(action: never): never {
  throw new Error(`unexpected action: ${JSON.stringify(action)}`);
}
