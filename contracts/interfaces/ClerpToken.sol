// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title Interface for the pool tokens
interface ClerpToken {
    function mint(uint256 amount, address account) external returns (bool);

    function burn(uint256 amount, address account) external returns (bool);
}