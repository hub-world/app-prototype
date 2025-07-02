import classNames from "classnames";
import { addDays, subDays } from "date-fns";
import {
  CreditCardIcon,
  MoreVerticalIcon,
  PlusIcon,
  QrCodeIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  TrashIcon,
  WalletIcon,
} from "lucide-react";
import { useState } from "react";

import { formatDateRange } from "../utils/date";
import { TopNav } from "~/components/TopNav";

type DigitalKey = {
  id: string;
  label: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
};

export function KeysScreen() {
  const [keys, setKeys] = useState<DigitalKey[]>([
    {
      id: "1",
      label: "My Apartment Key",
      isActive: true,
    },
    {
      id: "2",
      label: "Emma's Guest Key",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      isActive: true,
    },
    {
      id: "3",
      label: "Expired Key",
      endDate: subDays(new Date(), 1),
      isActive: false,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [newKeyStartDate, setNewKeyStartDate] = useState("");
  const [newKeyEndDate, setNewKeyEndDate] = useState("");
  const [qrModal, setQRModal] = useState<DigitalKey | null>(null);

  const handleAddKey = () => {
    if (!newKeyLabel.trim()) return;

    const newKey: DigitalKey = {
      id: Date.now().toString(),
      label: newKeyLabel.trim(),
      startDate: newKeyStartDate ? new Date(newKeyStartDate) : undefined,
      endDate: newKeyEndDate ? new Date(newKeyEndDate) : undefined,
      isActive: true,
    };

    setKeys([...keys, newKey]);
    setNewKeyLabel("");
    setNewKeyStartDate("");
    setNewKeyEndDate("");
    setShowAddModal(false);
    setQRModal(newKey);
  };

  const closeDropdown = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleDeleteKey = (keyId: string) => {
    setKeys(keys.filter((key) => key.id !== keyId));
    closeDropdown();
  };

  const handleToggleKeyStatus = (keyId: string) => {
    setKeys(
      keys.map((key) =>
        key.id === keyId ? { ...key, isActive: !key.isActive } : key,
      ),
    );
    closeDropdown();
  };

  const handleAddToWallet = () => {
    closeDropdown();
  };

  const handleShareKey = (keyId: string) => {
    const keyToShare = keys.find((k) => k.id === keyId);
    if (keyToShare) {
      setQRModal(keyToShare);
    }
    closeDropdown();
  };

  const handleCancelAddModal = () => {
    setShowAddModal(false);
    setNewKeyLabel("");
    setNewKeyStartDate("");
    setNewKeyEndDate("");
  };

  const handleCloseQrModal = () => {
    setQRModal(null);
  };

  return (
    <>
      <TopNav title="Keys Management" />

      <div className="p-4">
        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className="rounded-box border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <CreditCardIcon
                      className={classNames(
                        "h-5 w-5",
                        key.isActive
                          ? "text-base-content/80"
                          : "text-base-content/40",
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={classNames(
                        key.isActive
                          ? "text-base-content"
                          : "text-base-content/50",
                      )}
                    >
                      {key.label}
                    </h3>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    {key.startDate || key.endDate ? (
                      <div
                        className={classNames(
                          "text-xs",
                          key.isActive
                            ? "text-base-content/70"
                            : "text-base-content/40",
                        )}
                      >
                        {formatDateRange(key.startDate, key.endDate)}
                      </div>
                    ) : null}

                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-ghost btn-sm"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu z-1 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
                      >
                        <li>
                          <a onClick={() => handleShareKey(key.id)}>
                            <QrCodeIcon className="h-4 w-4" />
                            Share
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleAddToWallet()}>
                            <WalletIcon className="h-4 w-4" />
                            Add to Wallet
                          </a>
                        </li>
                        <li>
                          <span></span>
                        </li>
                        <li>
                          <a onClick={() => handleToggleKeyStatus(key.id)}>
                            {key.isActive ? (
                              <ToggleRightIcon className="h-4 w-4" />
                            ) : (
                              <ToggleLeftIcon className="h-4 w-4" />
                            )}
                            {key.isActive ? "Deactivate" : "Activate"}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => handleDeleteKey(key.id)}
                            className="text-error"
                          >
                            <TrashIcon className="h-4 w-4" />
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn mt-4 w-full btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="h-5 w-5" />
          Add Guest Key
        </button>

        {showAddModal && (
          <div className="modal-open modal">
            <div className="modal-box">
              <h3 className="mb-6 text-center text-lg font-bold">
                Add Guest Key
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Key Name</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input w-full"
                    value={newKeyLabel}
                    onChange={(e) => setNewKeyLabel(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text">From (optional)</span>
                    </label>
                    <input
                      type="date"
                      className="input-bordered input"
                      value={newKeyStartDate}
                      onChange={(e) => setNewKeyStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Until (optional)</span>
                    </label>
                    <input
                      type="date"
                      className="input-bordered input"
                      value={newKeyEndDate}
                      onChange={(e) => setNewKeyEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={handleCancelAddModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddKey}
                  disabled={!newKeyLabel.trim()}
                >
                  Add Key
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={handleCancelAddModal} />
          </div>
        )}

        {qrModal && (
          <div className="modal-open modal">
            <div className="modal-box">
              <h3 className="mb-6 text-center text-lg font-bold">
                Share "{qrModal.label}"
              </h3>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-64 w-64 items-center justify-center rounded-xl border-2 border-dashed border-base-300 bg-base-200">
                  <QrCodeIcon className="h-24 w-24 text-base-content/40" />
                </div>

                <p className="text-sm text-base-content/60">
                  Scan to share digital key access
                </p>
              </div>

              <div className="modal-action">
                <button className="btn btn-ghost" onClick={handleCloseQrModal}>
                  Close
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={handleCloseQrModal} />
          </div>
        )}
      </div>
    </>
  );
}
