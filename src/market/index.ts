export const idlFactory = ({ IDL }) => {
  const Token = IDL.Variant({
    Icp: IDL.Null,
    Ndp: IDL.Null,
    Ghost: IDL.Null,
    Dogmi: IDL.Null
  });
  const Standard = IDL.Variant({ Ext: IDL.Null, DIP20: IDL.Null });
  const NftInfo = IDL.Record({
    commission: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
    standard: Standard
  });
  const CommonError = IDL.Variant({
    InsufficientBalance: IDL.Null,
    InvalidToken: IDL.Text,
    Unauthorized: IDL.Text,
    Other: IDL.Text
  });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: CommonError });
  const Price = IDL.Variant({
    ICP: IDL.Nat64,
    NDP: IDL.Nat64,
    GHOST: IDL.Nat64,
    DOGMI: IDL.Nat64
  });
  const Disbursement = IDL.Record({
    to: IDL.Principal,
    to_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    try_num: IDL.Nat8,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    canister: IDL.Text,
    token_idf: IDL.Text,
    amount: Price
  });
  const DisburseService = IDL.Record({
    subaccount_num: IDL.Nat,
    disbursements_process_lock: IDL.Bool,
    failed_disbursements: IDL.Vec(Disbursement),
    disbursements_queue: IDL.Vec(Disbursement)
  });
  const LockInfo = IDL.Record({
    buyer_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    sold: IDL.Bool,
    locked: IDL.Nat64,
    buyer: IDL.Principal,
    transaction_subaccount: IDL.Vec(IDL.Nat8)
  });
  const Listing = IDL.Record({
    seller_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    seller: IDL.Principal,
    lock_info: IDL.Opt(LockInfo),
    price: Price
  });
  const Stats = IDL.Record({
    floor: IDL.Nat64,
    listings: IDL.Nat64,
    sales: IDL.Nat64,
    highest_price_sale: IDL.Nat64,
    lowest_price_sale: IDL.Nat64,
    supply: IDL.Nat64,
    total_volume: IDL.Nat64
  });
  const NFT = IDL.Record({
    listings: IDL.Vec(IDL.Tuple(IDL.Nat32, Listing)),
    canister_id: IDL.Text,
    pendding_listings: IDL.Vec(IDL.Tuple(IDL.Nat32, Listing)),
    stats: IDL.Vec(IDL.Tuple(IDL.Text, Stats))
  });
  const MarketService = IDL.Record({
    last_settle_cron: IDL.Nat64,
    nfts: IDL.Vec(IDL.Tuple(IDL.Text, NFT)),
    last_list_cron: IDL.Nat64,
    nft_project_list: IDL.Vec(
      IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(Token, NftInfo)))
    )
  });
  const Result_1 = IDL.Variant({ Ok: Price, Err: IDL.Text });
  const Result_2 = IDL.Variant({
    Ok: IDL.Tuple(IDL.Principal, IDL.Nat32),
    Err: IDL.Text
  });
  const GetLogMessagesFilter = IDL.Record({
    messageRegex: IDL.Opt(IDL.Text),
    messageContains: IDL.Opt(IDL.Text)
  });
  const GetLogMessagesParameters = IDL.Record({
    count: IDL.Nat32,
    filter: IDL.Opt(GetLogMessagesFilter),
    fromTimeNanos: IDL.Opt(IDL.Nat64)
  });
  const LogMessageData = IDL.Record({
    timeNanos: IDL.Nat64,
    message: IDL.Text
  });
  const CanisterLogMessages = IDL.Record({
    data: IDL.Vec(LogMessageData),
    lastAnalyzedMessageTimeNanos: IDL.Opt(IDL.Nat64)
  });
  const Result_3 = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  const Result_4 = IDL.Variant({ Ok: IDL.Text, Err: CommonError });
  const Result_5 = IDL.Variant({
    Ok: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Opt(Listing), IDL.Opt(IDL.Nat8)))
      )
    ),
    Err: CommonError
  });
  const Result_6 = IDL.Variant({
    Ok: IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Opt(Listing), IDL.Opt(IDL.Nat8))),
    Err: CommonError
  });
  const Result_7 = IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text });
  return IDL.Service({
    add_nft_project: IDL.Func(
      [IDL.Text, IDL.Vec(IDL.Tuple(Token, NftInfo))],
      [],
      []
    ),
    address: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Text], ['query']),
    admin_kill_heartbeat: IDL.Func([], [], []),
    admin_start_heartbeat: IDL.Func([], [], []),
    auto_list: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    backup_disburse: IDL.Func([], [DisburseService], ['query']),
    backup_market: IDL.Func([], [MarketService], ['query']),
    balance: IDL.Func(
      [Price, IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))],
      [Result_1],
      []
    ),
    decode_token: IDL.Func([IDL.Text], [Result_2], ['query']),
    delete_nft_project: IDL.Func([IDL.Text], [], []),
    delist: IDL.Func(
      [IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Text],
      [Result],
      []
    ),
    encode_token: IDL.Func([IDL.Principal, IDL.Nat32], [IDL.Text], ['query']),
    get_canister_log: IDL.Func(
      [GetLogMessagesParameters],
      [CanisterLogMessages],
      ['query']
    ),
    get_nft: IDL.Func([IDL.Text], [IDL.Opt(NFT)], ['query']),
    get_nft_project: IDL.Func(
      [IDL.Text],
      [IDL.Opt(IDL.Vec(IDL.Tuple(Token, NftInfo)))],
      ['query']
    ),
    get_owner: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    handle_disbursement: IDL.Func([Disbursement], [Result_3], []),
    handle_failed_disbursements: IDL.Func(
      [],
      [IDL.Opt(Disbursement), Result_3],
      []
    ),
    list: IDL.Func(
      [IDL.Text, IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Text, Price],
      [Result_4],
      []
    ),
    listings: IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Tuple(IDL.Nat32, Listing))],
      ['query']
    ),
    lock: IDL.Func(
      [IDL.Text, IDL.Text, Price, IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))],
      [Result_4],
      []
    ),
    market_tokens_ext: IDL.Func(
      [IDL.Text, IDL.Opt(IDL.Text)],
      [Result_5],
      ['query']
    ),
    restore_disburse: IDL.Func([DisburseService], [], ['query']),
    restore_market: IDL.Func([MarketService], [], ['query']),
    return_back: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
      [Result_4],
      []
    ),
    settle: IDL.Func([IDL.Text, IDL.Text], [Result], []),
    stats: IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Tuple(IDL.Text, Stats))],
      ['query']
    ),
    tokens_ext: IDL.Func([IDL.Text, IDL.Text], [Result_6], []),
    transfer: IDL.Func(
      [
        Price,
        IDL.Principal,
        IDL.Opt(IDL.Vec(IDL.Nat8)),
        IDL.Principal,
        IDL.Opt(IDL.Vec(IDL.Nat8)),
        Price,
        IDL.Text
      ],
      [Result_7],
      []
    )
  });
};
export const init = ({ IDL }) => {
  return [];
};
