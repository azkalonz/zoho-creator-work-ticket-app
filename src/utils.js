import { settings } from "./settings";

function revalidation(revalidation) {
  return {
    revalidateOnFocus: revalidation,
    revalidateOnReconnect: revalidation,
    refreshWhenOffline: revalidation,
    refreshWhenHidden: revalidation,
    ...(revalidation ? {} : { refreshInterval: 0 }),
  };
}

export function disableRevalidation() {
  return revalidation(false);
}

export function enableRevalidation() {
  return revalidation(true);
}

export function formatCurrency(value) {
  var number = value;

  var options = {
    minimumFractionDigits: settings.quantity_precision,
    maximumFractionDigits: settings.quantity_precision,
    style: "currency",
    currency: "USD",
  };
  var formattedNum = number.toLocaleString("en-US", options);

  return formattedNum;
}

export function getZohoInventoryItemLink(id, searchText = "", composite = true) {
  if (!id) return "";
  let link = `https://inventory.zoho.com/app/789146207#/inventory/${composite ? "compositeitems" : "items"}/${id}`;
  if (searchText) {
    link += `?filter_by=Status.All&per_page=200&search_criteria=%7B"search_text"%3A"${searchText}"%7D&sort_column=name&sort_order=A`;
  }
  return link;
}

export function getZohoInventoryBundleLink(itemId, bundleId, searchText = "") {
  if (!itemId) return "";
  let link = `https://inventory.zoho.com/app/789146207#/inventory/compositeitems/${itemId}/bundling/${bundleId}`;
  if (searchText) {
    link += `?filter_by=Status.All&per_page=200&search_criteria=%7B%22search_text%22%3A%22${searchText}%22%7D&sort_column=name&sort_order=A`;
  }
  return link;
}

export function getAuthenticationLink(state) {
  return `https://accounts.zoho.com/oauth/v2/auth?client_id=${settings.api.client_id}&state=${state}&response_type=code&redirect_uri=${settings.api.redirect_url}&access_type=offline&scope=${settings.api.scopes}&prompt=consent`;
}
