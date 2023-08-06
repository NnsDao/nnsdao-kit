import type { ActorMethod } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

export interface CallNumberReq {
  table_id: bigint;
  number: number;
}
export interface CallNumberResp {
  next_index: number;
  rebegin: boolean;
}
export type Result = { Ok: boolean } | { Err: string };
export type Result_1 = { Ok: CallNumberResp } | { Err: string };
export type Result_2 = { Ok: SotPokerResp } | { Err: string };
export interface SotPokerReq {
  cards: Uint32Array | number[];
  table_id: bigint;
}
export interface SotPokerResp {
  is_end: boolean;
}
export interface TableId {
  table_id: bigint;
}
export type TableStatus =
  | { Begining: null }
  | { Calling: null }
  | { Ending: null }
  | { Ready: null }
  | { Waiting: null };
export interface TableStatusResp {
  status: TableStatus;
  current_gamer_index: number;
  biggest_gamer: [] | [Principal];
  cards: Uint32Array | number[];
  farmers: Array<Principal>;
  last_pokers: Uint32Array | number[];
  gamers: Array<Principal>;
  winner: Winner;
  biggest_num: number;
  create_time: bigint;
  multiple: bigint;
  landlord: [] | [Principal];
  call_number: Array<[Principal, number]>;
  pokers: Uint32Array | number[];
}
export type Winner = { Farmer: null } | { Null: null } | { Landlord: null };
export interface _SERVICE {
  begin: ActorMethod<[TableId], Result>;
  call_number: ActorMethod<[CallNumberReq], Result_1>;
  cancel_gamer: ActorMethod<[], undefined>;
  destroy_table: ActorMethod<[TableId], undefined>;
  greet: ActorMethod<[string], string>;
  re_begin: ActorMethod<[TableId], Result>;
  search_table: ActorMethod<[], bigint>;
  shot_poker: ActorMethod<[SotPokerReq], Result_2>;
  table_status: ActorMethod<[TableId], TableStatusResp>;
}
