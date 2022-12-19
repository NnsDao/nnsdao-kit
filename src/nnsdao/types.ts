import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CanisterStatusResponse {
  status: Status;
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettings;
  module_hash: [] | [Uint8Array];
}
export interface DaoInfo {
  option: Array<[string, string]>;
  name: string;
  tags: Array<string>;
  canister_id: string;
  intro: string;
  avatar: string;
  poster: string;
}
export interface DefiniteCanisterSettings {
  freezing_threshold: bigint;
  controllers: Array<Principal>;
  memory_allocation: bigint;
  compute_allocation: bigint;
}
export interface JoinDaoParams {
  nickname: string;
  social: Array<Social>;
  intro: string;
  avatar: string;
}
export interface MemberItems {
  principal: Principal;
  nickname: string;
  social: Array<Social>;
  join_at: bigint;
  intro: string;
  last_visit_at: bigint;
  status_code: number;
  avatar: string;
}
export interface Proposal {
  id: bigint;
  title: string;
  content: string;
  vote_data: Array<[Principal, Votes]>;
  end_time: bigint;
  start_time: bigint;
  timestamp: bigint;
  property: [] | [Array<[string, string]>];
  proposer: Principal;
  proposal_state: ProposalState;
}
export interface ProposalContent {
  title: string;
  content: string;
  end_time: bigint;
  start_time: bigint;
  property: [] | [Array<[string, string]>];
}
export interface ProposalLog {
  pending: BigUint64Array;
  finished: Array<[bigint, Result_7]>;
}
export type ProposalState =
  | { Failed: string }
  | { Open: null }
  | { Executing: null }
  | { Rejected: null }
  | { Succeeded: null }
  | { Accepted: null };
export type RejectionCode =
  | { NoError: null }
  | { CanisterError: null }
  | { SysTransient: null }
  | { DestinationInvalid: null }
  | { Unknown: null }
  | { SysFatal: null }
  | { CanisterReject: null };
export type Result = { Ok: null } | { Err: string };
export type Result_1 = { Ok: DaoInfo } | { Err: string };
export type Result_2 =
  | { Ok: [CanisterStatusResponse] }
  | { Err: [RejectionCode, string] };
export type Result_3 = { Ok: Proposal } | { Err: string };
export type Result_4 = { Ok: Array<[bigint, Proposal]> } | { Err: string };
export type Result_5 = { Ok: MemberItems } | { Err: string };
export type Result_6 = { Ok: Array<MemberItems> } | { Err: string };
export type Result_7 = { Ok: string } | { Err: string };
export type Result_8 = { Ok: ProposalLog } | { Err: string };
export interface Social {
  key: string;
  link: string;
}
export type Status = { stopped: null } | { stopping: null } | { running: null };
export interface UserVoteArgs {
  id: bigint;
  principal: [] | [Principal];
  vote: Votes;
}
export type Votes = { No: bigint } | { Yes: bigint };
export interface _SERVICE {
  add_owner: ActorMethod<[Principal], Result>;
  dao_info: ActorMethod<[], Result_1>;
  dao_status: ActorMethod<[], Result_2>;
  get_owner: ActorMethod<[], Array<Principal>>;
  get_proposal: ActorMethod<[bigint], Result_3>;
  get_proposal_list: ActorMethod<[], Result_4>;
  join: ActorMethod<[JoinDaoParams], Result_5>;
  member_list: ActorMethod<[], Result_6>;
  proposal_heartbeat_log: ActorMethod<[], Result_8>;
  propose: ActorMethod<[ProposalContent], Result_3>;
  quit: ActorMethod<[], Result_5>;
  update_dao_info: ActorMethod<[DaoInfo], Result_1>;
  user_info: ActorMethod<[[] | [Principal]], Result_5>;
  vote: ActorMethod<[UserVoteArgs], Result>;
}
