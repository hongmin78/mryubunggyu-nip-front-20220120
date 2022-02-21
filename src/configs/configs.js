
const MIN_STAKE_AMOUNT = 100

/********* await-tx-mined */
const TXREQSTATUS_POLL_INTERVAL = 3000
const TXREQSTATUS_BLOCKCOUNT = 1 // 2 // 4 // 6
let TX_POLL_OPTIONS={
	interval : TXREQSTATUS_POLL_INTERVAL
	, blocksToWait : TXREQSTATUS_BLOCKCOUNT
}

export { 
	MIN_STAKE_AMOUNT
	, TX_POLL_OPTIONS
}
