# IWiry



> Interface of Wiry token





## Methods

### addToBlackList

```solidity
function addToBlackList(address user) external nonpayable
```

Adds a new user to the blacklist



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The user to be blacklisted |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```



*Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### approve

```solidity
function approve(address spender, uint256 amount) external nonpayable returns (bool)
```



*Sets `amount` as the allowance of `spender` over the caller&#39;s tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender&#39;s allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```



*Returns the amount of tokens owned by `account`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### burnFrom

```solidity
function burnFrom(address from, uint256 amount) external nonpayable
```

Burns `amount` of tokens from `from` address



#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | The address holding tokens |
| amount | uint256 | The amount of tokens to burn |

### mint

```solidity
function mint(address to, uint256 amount) external nonpayable
```

Mints `amount` tokens to `to`



#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | The address to mint tokens to |
| amount | uint256 | The amount of tokens to be minted |

### pause

```solidity
function pause() external nonpayable
```

Allows to pause all token&#39;s functions




### removeFromBlackList

```solidity
function removeFromBlackList(address user) external nonpayable
```

Removes user from the blacklist



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | The user to be removed from blacklist |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```



*Returns the amount of tokens in existence.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transfer

```solidity
function transfer(address to, uint256 amount) external nonpayable returns (bool)
```



*Moves `amount` tokens from the caller&#39;s account to `to`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) external nonpayable returns (bool)
```



*Moves `amount` tokens from `from` to `to` using the allowance mechanism. `amount` is then deducted from the caller&#39;s allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | undefined |
| to | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### unpause

```solidity
function unpause() external nonpayable
```

Allows to unpause all token&#39;s functions






## Events

### AddedToBlackList

```solidity
event AddedToBlackList(address user)
```

Indicates that `user` was blacklisted



#### Parameters

| Name | Type | Description |
|---|---|---|
| user  | address | undefined |

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| spender `indexed` | address | undefined |
| value  | uint256 | undefined |

### RemovedFromBlackList

```solidity
event RemovedFromBlackList(address user)
```

Indicates that `user` was removed from blacklist



#### Parameters

| Name | Type | Description |
|---|---|---|
| user  | address | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| value  | uint256 | undefined |



