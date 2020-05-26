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

import { Action, ApplyActionsToState } from "..";
import { State } from "../../state";

test("remove", () => {
  const player = {
    id: "0",
    handID: "hand",
  };

  let state: State = {
    objects: {},
    players: {
      [player.id]: player,
    },
  };

  const action: Action = {
    kind: "player/remove",
    id: "0",
  };
  state = ApplyActionsToState(state, [action]);
  expect(state.players).toEqual({});
});
