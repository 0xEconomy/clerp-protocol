// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title The contract factory for the vault contracts. Utilizes minimal clones to keep gas costs low
interface VaultFactory {
    // #### Events
    /**
     * @notice Creates a notification when a vault is deployed
     * @param vault Address of the new vault
     * @param ticker Ticker of the new vault
     */
    event DeployVault(uint256 indexed vaultId, address vaultAddress, address assetAddress);

    /**
     * @notice Creates a notification when the vault committer deployer for the factory changes
     * @param _vaultCommitterDeployer Address of the new vault committer deployer
     */
    event VaultCommitterDeployerChanged(address _vaultCommitterDeployer);

    // #### Read functions
    function vaults() external view returns (address[] memory);
    function vault(uint256 vaultId) external view returns (address);
    function numvaults() external view returns (uint256);
    function isValidvault(address _vault) external view returns (bool);
    function isLocked(uint256 id) external view returns (bool);
    function vaultsForAsset(address asset) external view returns (address[] memory);
    function mintFee() external view returns (uint64);
    function redeemFee() external view returns (uint64);
    function vaultFees(uint256 vaultId) external view returns (uint256, uint256, uint256, uint256, uint256);

    // #### Write Functions
    function deployVault(
        string calldata name,
        string calldata symbol,
        address _assetAddress,
        bool is1155,
        bool allowAllItems
    ) external returns (uint256);
  
    function disableVaultFees(uint256 vaultId) external;

}