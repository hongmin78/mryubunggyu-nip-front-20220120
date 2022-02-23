
const MIN_STAKE_AMOUNT = 100

/********* await-tx-mined */
const TXREQSTATUS_POLL_INTERVAL = 3000
const TXREQSTATUS_BLOCKCOUNT = 1 // 2 // 4 // 6
let TX_POLL_OPTIONS={
	interval : TXREQSTATUS_POLL_INTERVAL
	, blocksToWait : TXREQSTATUS_BLOCKCOUNT
}
const URL_BASE=`http://nips1.net`
const URL_METADATA_BASE=`http://nips1.net/assets/json` // /2.json
export { 
	MIN_STAKE_AMOUNT
	, TX_POLL_OPTIONS
	, URL_BASE
	, URL_METADATA_BASE
}
