<template>
  <div id="token-profile" class="mb-14 token-profile">
    <div class="token-profile-header">
      <v-container>
        <h1 class="header">Token Profile</h1>
        <p class="content-text">
          Listed below are the tokens you’ve minted. Only the tokens associated
          with the connected wallet will appear as part of this list.
        </p>
      </v-container>
    </div>
    <div class="token-profile_content desktop">
      <v-row>
        <v-col xl="1" lg="1" md="2" sm="2" xs="1">
          <div class="img-fluid">
            <cld-image
              :cloudName="cloudName"
              v-if="tokenDetail && tokenDetail.logo"
              :publicId="(tokenDetail && tokenDetail.logo) || ''"
              width="95"
            >
              <cld-transformation radius="max" />
              <cld-transformation width="95" height="95" crop="scale" />
            </cld-image>
            <!-- <v-img
              v-else
              alt="Icon"
              src="@/assets/pok-logo.png"
              width="95"
              class="token-profile_content-img"
            ></v-img> -->
          </div>
        </v-col>
        <v-col xl="11" lg="11" md="10" sm="10" xs="11">
          <v-row>
            <v-col xl="4" lg="4" md="6" sm="6" xs="6">
              <div>
                <div class="token-profile_content-header">
                  {{ (tokenDetail && tokenDetail.name) || "" }}
                  <div
                    class="verified"
                    v-if="
                      tokenDetail &&
                      tokenDetail.verified == false &&
                      isTokenOwner
                    "
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          @click.stop="getEhtherVerified = true"
                          medium
                          color="red"
                          class="ml-2"
                        >
                          mdi-alert-circle-outline
                        </v-icon>
                      </template>
                      <span class="Black--text">Not Verified</span>
                    </v-tooltip>
                  </div>
                  <VerifyByEther
                    :visible="getEhtherVerified"
                    @close="getEhtherVerified = false"
                    :blockId="tokenDetail && tokenDetail.blockchain_id"
                    :tokenAddress="tokenDetail && tokenDetail.token_address"
                  />
                </div>
                <div class="token-profile_content-text">
                  {{ (tokenDetail && tokenDetail.symbol) || "" }}
                </div>
                <div class="token-profile_content-price">
                  ${{
                    (tokenDetail &&
                      tokenDetail.value &&
                      parseFloat(tokenDetail.value).toFixed(2)) ||
                    0
                  }}
                  <!-- <span class="token-profile_content-percentage">-0.18% D</span> -->
                </div>
                <div class="token-profile_content-header mt-6">
                  Contract Address
                </div>
                <div class="token-profile_content-text">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <Overflow
                        >{{
                          tokenDetail &&
                          getShorterText(tokenDetail.token_address, 10)
                        }}
                        <span
                          style="cursor: pointer"
                          @click="
                            copyAddress(
                              tokenDetail && tokenDetail.token_address
                            )
                          "
                          ><v-icon small color="#FE6F0A"
                            >mdi-clipboard-multiple-outline</v-icon
                          ></span
                        ></Overflow
                      >
                    </template>

                    <template v-slot:tooltip-message>
                      {{ tokenDetail && tokenDetail.token_address }}
                    </template>
                  </Tooltip>
                </div>
                <div class="token-profile_content-header mt-4">
                  Block Chain Name
                </div>
                <div
                  class="token-profile_content-text d-flex align-items-center"
                >
                  <v-img
                    alt=""
                    :src="
                      tokenDetail &&
                      allBlockchains[tokenDetail.blockchain_id] &&
                      allBlockchains[tokenDetail.blockchain_id].icon
                    "
                    class="cap-logo"
                  /><span>
                    {{ blockchainName }}
                  </span>
                </div>
                <div class="token-profile_content-header mt-4">Auditor:</div>
                <div class="token-profile_content-text">
                  <span
                    v-if="
                      tokenDetail &&
                      (!isTokenOwner ||
                        tokenDetail.hacken_audit_status != 'Not Verified')
                    "
                    >Hacken ({{ tokenDetail.hacken_audit_status || "" }})
                  </span>
                  <v-btn
                    v-else
                    class=""
                    height="29"
                    width="157"
                    color="#4ADDA5"
                    @click.stop="getVerified = true"
                    elevation="0"
                  >
                    Get Verified by Hacken
                  </v-btn>
                  <VerifyByHacken
                    :visible="getVerified"
                    @close="getVerified = false"
                    :tokenId="tokenDetail && tokenDetail.id"
                    :tokenAddress="tokenDetail && tokenDetail.token_address"
                    :blockchainId="tokenDetail && tokenDetail.blockchain_id"
                  />
                </div>
              </div>
            </v-col>
            <v-col xl="4" lg="4" md="6" sm="6" xs="6">
              <div>
                <div class="token-profile_content-header">Max Supply</div>
                <div class="token-profile_content-text d-flex">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      {{
                        tokenDetail &&
                        numberWithCommas(
                          getShorterNumber(tokenDetail.max_supply)
                        )
                      }}
                    </template>

                    <template v-slot:tooltip-message>
                      {{
                        tokenDetail && numberWithCommas(tokenDetail.max_supply)
                      }}
                    </template>
                  </Tooltip>
                  <span class="ml-2">
                    {{ tokenDetail && tokenDetail.symbol }}
                  </span>
                </div>
                <div class="token-profile_content-header mt-4">Website:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.website"
                >
                  <a :href="tokenDetail.website" target="_blank">
                    {{ getShorterNumber(tokenDetail.website, 30) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Telegram:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.telegram"
                >
                  <a :href="tokenDetail.telegram" target="_blank">
                    {{ getShorterNumber(tokenDetail.telegram, 30) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Twitter:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.twitter"
                >
                  <a :href="tokenDetail.twitter" target="_blank">
                    {{ getShorterNumber(tokenDetail.twitter, 30) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Decimals:</div>
                <div class="token-profile_content-text">
                  {{ tokenDetail && tokenDetail.decimals }}
                </div>
              </div>
            </v-col>
            <v-col xl="4" lg="4" md="12" sm="12" xs="12">
              <div>
                <div class="token-profile_content-header">Holders:</div>
                <div class="token-profile_content-text">
                  {{ (tokenHolders && tokenHolders.length) || 0 }}
                </div>
                <div class="token-profile_content-header mt-4">Transfers:</div>
                <div class="token-profile_content-text">
                  {{ (tokenTransfers && tokenTransfers.length) || 0 }}
                </div>
                <!-- <div class="token-profile_content-header mt-4">Trades:</div>
                <div class="token-profile_content-text">0</div> -->
                <div class="token-profile_content-header mt-4">
                  <v-btn
                    height="50"
                    width="173"
                    color="primary"
                    @click="syncTokenDetail"
                    :loading="loading"
                    elevation="0"
                    >Sync</v-btn
                  >
                </div>
                <!-- <div class="token-profile_content-text--date">11/11/2021
                    05:32 pm D</div>        -->
                <div class="token-profile_content-text--date">
                  {{ syncedAt }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <!-- Only Mobile View -->
    <div class="token-profile_content mobile">
      <v-row>
        <v-col cols="2" class="pr-0">
          <div class="img-fluid">
            <cld-image
              :cloudName="cloudName"
              v-if="tokenDetail && tokenDetail.logo"
              :publicId="(tokenDetail && tokenDetail.logo) || ''"
              width="54"
            >
              <cld-transformation radius="max" />
              <cld-transformation width="54" height="54" crop="scale" />
            </cld-image>
            <!-- <v-img
              v-else
              alt="Icon"
              src="@/assets/pok-logo.png"
              width="95"
              class="token-profile_content-img"
            ></v-img> -->
          </div>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <div>
                <div class="token-profile_content-header">
                  {{ (tokenDetail && tokenDetail.name) || "" }}
                  <div
                    class="verified"
                    v-if="tokenDetail && tokenDetail.verified == false"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          @click.stop="getEhtherVerified = true"
                          small
                          color="red"
                          class="ml-2"
                        >
                          mdi-alert-circle-outline
                        </v-icon>
                      </template>
                      <span class="Black--text">Not Verified</span>
                    </v-tooltip>
                  </div>
                  <!-- <VerifyByEther
                    :visible="getEhtherVerified"
                    @close="getEhtherVerified = false"
                    :blockId="tokenDetail && tokenDetail.blockchain_id"
                    :tokenAddress="tokenDetail && tokenDetail.token_address"
                  /> -->
                </div>
                <div class="token-profile_content-text">
                  {{ (tokenDetail && tokenDetail.symbol) || "" }}
                </div>
                <div class="token-profile_content-price">
                  ${{
                    (tokenDetail &&
                      tokenDetail.value &&
                      parseFloat(tokenDetail.value).toFixed(2)) ||
                    0
                  }}
                  <!-- <span class="token-profile_content-percentage">-0.18% D</span> -->
                </div>
                <div class="token-profile_content-header mt-6">
                  Contract Address
                </div>
                <div class="token-profile_content-text">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <Overflow
                        >{{ tokenDetail && tokenDetail.token_address }}
                        <span
                          style="cursor: pointer"
                          @click="
                            copyAddress(
                              tokenDetail && tokenDetail.token_address
                            )
                          "
                          ><v-icon small color="#FE6F0A"
                            >mdi-clipboard-multiple-outline</v-icon
                          ></span
                        ></Overflow
                      >
                    </template>

                    <template v-slot:tooltip-message>
                      {{ tokenDetail && tokenDetail.token_address }}
                    </template>
                  </Tooltip>
                </div>
                <div class="token-profile_content-header mt-4">
                  Blockchain Name
                </div>
                <div
                  class="token-profile_content-text d-flex align-items-center"
                >
                  <v-img
                    alt=""
                    :src="
                      tokenDetail &&
                      allBlockchains[tokenDetail.blockchain_id] &&
                      allBlockchains[tokenDetail.blockchain_id].icon
                    "
                    class="cap-logo"
                  /><span>
                    {{ blockchainName }}
                  </span>
                </div>
                <div class="token-profile_content-header mt-4">Auditor:</div>
                <div class="token-profile_content-text">
                  <span
                    v-if="
                      tokenDetail &&
                      (!isTokenOwner ||
                        tokenDetail.hacken_audit_status != 'Not Verified')
                    "
                    >Hacken ({{ tokenDetail.hacken_audit_status || "" }})</span
                  >
                  <v-btn
                    v-else
                    class=""
                    height="29"
                    width="157"
                    color="#4ADDA5"
                    @click.stop="getVerified = true"
                    elevation="0"
                  >
                    Get Verified by Hacken
                  </v-btn>
                  <VerifyByHacken
                    :visible="getVerified"
                    @close="getVerified = false"
                    :tokenId="tokenDetail && tokenDetail.id"
                    :tokenAddress="tokenDetail && tokenDetail.token_address"
                    :blockchainId="tokenDetail && tokenDetail.blockchain_id"
                  />
                </div>
                <div class="token-profile_content-header mt-4">Holders:</div>
                <div class="token-profile_content-text">
                  {{ (tokenHolders && tokenHolders.length) || 0 }}
                </div>
                <div class="token-profile_content-header mt-4">Transfers:</div>
                <div class="token-profile_content-text">
                  {{ (tokenTransfers && tokenTransfers.length) || 0 }}
                </div>
                <div class="token-profile_content-header mt-4">
                  <v-btn
                    height="50"
                    width="173"
                    color="primary"
                    @click="syncTokenDetail"
                    :loading="loading"
                    elevation="0"
                    >Sync</v-btn
                  >
                </div>
                <!-- <div class="token-profile_content-text--date">11/11/2021
                  05:32 pm D</div>        -->
                <div class="token-profile_content-text--date">
                  {{ syncedAt }}
                </div>
              </div>
            </v-col>
            <v-col cols="6">
              <div>
                <div class="token-profile_content-header">Max Supply</div>
                <div class="token-profile_content-text">
                  {{ tokenDetail && numberWithCommas(tokenDetail.max_supply) }}
                  {{ tokenDetail && tokenDetail.symbol }}
                </div>
                <div class="token-profile_content-header mt-4">Website:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.website"
                >
                  <a :href="tokenDetail.website" target="_blank">
                    {{ getShorterText(tokenDetail.website) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Telegram:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.telegram"
                >
                  <a :href="tokenDetail.telegram" target="_blank">
                    {{ getShorterText(tokenDetail.telegram) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Twitter:</div>
                <div
                  class="token-profile_content-text"
                  v-if="tokenDetail && tokenDetail.twitter"
                >
                  <a :href="tokenDetail.twitter">
                    {{ getShorterText(tokenDetail.twitter) || "" }}
                    <span
                      ><v-icon small color="#372F2F"
                        >mdi-open-in-new</v-icon
                      ></span
                    >
                  </a>
                </div>
                <div class="token-profile_content-header mt-4">Decimals:</div>
                <div class="token-profile_content-text">
                  {{ tokenDetail && tokenDetail.decimals }}
                </div>
                <!-- <div class="token-profile_content-header mt-4">Trades:</div>
                <div class="token-profile_content-text">0</div> -->
              </div>
            </v-col>
          </v-row>
          <div>
            <div></div>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- -->
    <div class="token-profile-tabs mt-6">
      <v-tabs v-model="tab" grow>
        <v-tab> Capabilities </v-tab>
        <v-tab> Holders </v-tab>
        <v-tab> Transfers </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="capabilities-content mt-8 mb-8">
            <div class="token-profile_content-header">Capabilities</div>
            <div class="token-profile_content-text">
              Here you can see summary of capabilities you have already availed.
            </div>
            <div class="capabilities-half">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.TX_FEE) && 'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.TX_FEE)"
                        >$vuetify.icons.transactionIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/transaction.png"
                          class="capability-img"
                        ></v-img>
                      </div>
                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Transaction Fee
                        </div>
                        <div class="capabilities-content_summary-text">
                          {{
                            tokenDetail &&
                            tokenDetail.transaction_fee_percentage
                          }}%
                        </div>
                      </div>
                    </div>
                    <div class="capabilities-content_summary-text-value">
                      Nominated Wallet
                    </div>
                    <div class="capabilities-content_summary-text-value">
                      {{ tokenDetail && tokenDetail.nominated_wallet }}
                    </div>
                  </div>
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.BURN) && 'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.BURN)"
                        >$vuetify.icons.burnIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/fire.png"
                          class="capability-img"
                        ></v-img>
                      </div>

                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Burn Capability
                        </div>
                        <!-- <div class="capabilities-content_summary-text">
                          {{ (tokenDetail && tokenDetail.amount_to_burn) || 0 }}
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.BLACKLIST) &&
                      'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.BLACKLIST)"
                        >$vuetify.icons.gearsIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/gears.png"
                          class="capability-img"
                        ></v-img>
                      </div>
                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Blacklisting Capability
                        </div>
                      </div>
                    </div>
                    <div
                      v-for="item in tokenDetail &&
                      tokenDetail.blacklisted_wallets"
                      v-bind:key="item"
                      class="capabilities-content_summary-text-value"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.MINT) && 'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.MINT)"
                        >$vuetify.icons.mintIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/profile.png"
                          class="capability-img"
                        ></v-img>
                      </div>
                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Mint Capability
                        </div>
                        <!-- <div class="capabilities-content_summary-text">
                          {{ (tokenDetail && tokenDetail.amount_to_mint) || 0 }}
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.SNAPSHOT) &&
                      'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.SNAPSHOT)"
                        >$vuetify.icons.snapshotIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/camera.png"
                          class="capability-img"
                        ></v-img>
                      </div>
                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Screenshot Capabillity
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    :class="`capabilities-content_summary ${
                      isCapabilityInluded(CAPABILITIES_NAMES.WHITELIST) &&
                      'active'
                    }`"
                  >
                    <div>
                      <v-icon
                        v-if="isCapabilityInluded(CAPABILITIES_NAMES.WHITELIST)"
                        >$vuetify.icons.pauseIcon</v-icon
                      >
                      <div v-else class="capability-img-container">
                        <v-img
                          alt="Icon"
                          src="@/assets/pause.png"
                          class="capability-img"
                        ></v-img>
                      </div>
                      <div class="capabilities-content_summary-content">
                        <div class="capabilities-content_summary-header">
                          Pausing Capability
                        </div>
                      </div>
                    </div>
                    <div class="capabilities-content_summary-text-value">
                      White listing Capability
                    </div>
                    <div
                      v-for="item in tokenDetail &&
                      tokenDetail.whitelisted_wallets"
                      v-bind:key="item"
                      class="capabilities-content_summary-text-value"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="search">
            <v-text-field
              solo
              label="Search Here....."
              append-icon="mdi-magnify"
              class="search-field"
              height="50"
              persistent-hint
              v-model="search"
            ></v-text-field>
            <v-btn
              height="50"
              width="173"
              color="primary"
              class="ml-2"
              @click="
                csvExport(
                  tokenHolders,
                  ['address', 'balance', 'pendingBalanceUpdate'],
                  'Holders'
                )
              "
              :loading="loading"
              elevation="0"
            >
              <v-icon left dark> mdi-tray-arrow-down </v-icon> Export CSV
              File</v-btn
            >
          </div>
          <div class="datatable">
            <v-data-table
              :headers="headers"
              :items="tokenHolders"
              :search="search"
              item-key="name"
              class="elevation-0"
              mobile-breakpoint="300"
            >
              <template v-slot:[`item.id`]="{ item }">
                <div class="text-container">
                  <div class="d-flex">
                    <div class="d-flex flex-column ml-2">
                      <span
                        :style="{ color: $vuetify.theme.themes[theme].text }"
                        class="token-name"
                        >#
                        {{
                          tokenHolders
                            .map((h) => h.address)
                            .indexOf(item.address) + 1 || 0
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:[`item.address`]="{ item }">
                <div class="text-container">
                  <div class="d-flex align-items-center">
                    <a
                      target="_blank"
                      :href="
                        getNetworkUrl(
                          `token/${tokenDetail.token_address}?a=${item.address}`
                        )
                      "
                    >
                      <span class="text-align">{{ item.address }}</span>
                    </a>
                    <span
                      style="cursor: pointer"
                      @click="copyAddress(item.address)"
                    >
                      <v-icon small class="ml-2"
                        >mdi-clipboard-multiple-outline</v-icon
                      >
                    </span>
                  </div>
                </div> </template
              ><template v-slot:[`item.balance`]="{ item }">
                <div class="text-container">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <span class="text-align">{{
                        numberWithCommas(
                          getShorterNumber(
                            formatUnits(item.balance, tokenDetail.decimals)
                          )
                        )
                      }}</span>
                    </template>
                    <template v-slot:tooltip-message>
                      {{
                        numberWithCommas(
                          formatUnits(item.balance, tokenDetail.decimals)
                        )
                      }}
                    </template>
                  </Tooltip>
                </div>
              </template>
              <template v-slot:[`item.max_supply`]="{ item }">
                <div class="text-container">
                  <span class="text-align"
                    >{{
                      getPercentage(
                        tokenDetail.max_supply,
                        formatUnits(item.balance, tokenDetail.decimals)
                      )
                    }}%</span
                  >
                </div>
              </template>
              <template v-slot:[`item.value`]="{ item }">
                <div class="text-container" :id="item">
                  ${{
                    getPValue(formatUnits(item.balance, tokenDetail.decimals))
                  }}
                </div>
              </template>
              <template v-slot:[`item.view`]="{ item }">
                <a
                  target="_blank"
                  :href="
                    getNetworkUrl(
                      `token/${tokenDetail.token_address}?a=${item.address}#tokenAnalytics`
                    )
                  "
                >
                  <div class="text-container view">
                    <span class="text-align" hidden>{{ item.view }} </span>
                    <v-icon small left color="#3698DB">mdi-chart-bar</v-icon>
                  </div>
                </a>
              </template>
            </v-data-table>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="search">
            <v-text-field
              solo
              label="Search Here....."
              append-icon="mdi-magnify"
              class="search-field"
              height="50"
              persistent-hint
              :style="{ color: $vuetify.theme.themes[theme].text }"
              v-model="searchTransfer"
            ></v-text-field>
            <v-btn
              height="50"
              width="173"
              class="ml-2"
              color="primary"
              @click="
                csvExport(
                  tokenTransfers,
                  [
                    'transaction_hash',
                    'block_hash',
                    'dateTime',
                    'from_address',
                    'to_address',
                    'value',
                  ],
                  'Transfers'
                )
              "
              :loading="loading"
              elevation="0"
            >
              <v-icon left dark> mdi-tray-arrow-down </v-icon> Export CSV
              File</v-btn
            >
          </div>
          <div class="datatable">
            <v-data-table
              :headers="headersTransfer"
              :items="tokenTransfers"
              :search="searchTransfer"
              item-key="name"
              class="elevation-0"
              mobile-breakpoint="300"
            >
              <template v-slot:[`item.transaction_hash`]="{ item }">
                <div class="text-container">
                  <div class="d-flex">
                    <div class="d-flex flex-row ml-2">
                      <Tooltip>
                        <template v-slot:activator-tooltip>
                          <a
                            target="_blank"
                            :href="getNetworkUrl(`tx/${item.transaction_hash}`)"
                          >
                            <span class="token-name">
                              {{ getShorterText(item.transaction_hash, 15) }}
                            </span>
                          </a>
                        </template>
                        <template v-slot:tooltip-message>
                          {{ item.transaction_hash }}
                        </template>
                      </Tooltip>
                      <span
                        style="cursor: pointer"
                        class="ml-1"
                        @click="copyAddress(item.transaction_hash)"
                      >
                        <v-icon small>
                          mdi-clipboard-multiple-outline</v-icon
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </template>
              <!-- <template v-slot:[`item.blockchain_name`]="{ item }">
                <div class="text-container">
                  <div class="d-flex align-items-center">
                    <span class="text-align" hidden>{{
                      item.blockchain_name
                    }}</span>
                    <span class="text-align">Un Stake (D)</span>
                  </div>
                </div> </template 
              > -->
              <template v-slot:[`item.createdAt`]="{ item }">
                <div class="text-container">
                  <span class="text-align">{{
                    calculateAge(item.createdAt)
                  }}</span>
                </div>
              </template>
              <template v-slot:[`item.from_address`]="{ item }">
                <div class="text-container d-flex flex-row ml-2">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <a
                        target="_blank"
                        :href="getNetworkUrl(`address/${item.from_address}`)"
                      >
                        <span class="text-align">
                          {{ getShorterText(item.from_address, 10) }}</span
                        >
                      </a>
                    </template>
                    <template v-slot:tooltip-message>
                      {{ item.from_address }}
                    </template>
                  </Tooltip>
                  <span
                    style="cursor: pointer"
                    class="ml-1"
                    @click="copyAddress(item.from_address)"
                  >
                    <v-icon small> mdi-clipboard-multiple-outline</v-icon></span
                  >
                </div>
              </template>
              <template v-slot:[`item.to_address`]="{ item }">
                <div class="text-container d-flex flex-row ml-2" :id="item">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <a
                        target="_blank"
                        :href="getNetworkUrl(`address/${item.to_address}`)"
                      >
                        {{ getShorterText(item.to_address, 10) }}
                      </a>
                    </template>
                    <template v-slot:tooltip-message>
                      {{ item.to_address }}
                    </template>
                  </Tooltip>
                  <span
                    style="cursor: pointer"
                    class="ml-1"
                    @click="copyAddress(item.to_address)"
                  >
                    <v-icon small> mdi-clipboard-multiple-outline</v-icon></span
                  >
                </div>
              </template>
              <template v-slot:[`item.value`]="{ item }">
                <div class="text-container">
                  <Tooltip>
                    <template v-slot:activator-tooltip>
                      <span class="text-align"
                        >{{
                          numberWithCommas(
                            getShorterNumber(
                              formatUnits(item.value, tokenDetail.decimals)
                            )
                          )
                        }}
                      </span>
                    </template>
                    <template v-slot:tooltip-message>
                      {{
                        numberWithCommas(
                          formatUnits(item.value, tokenDetail.decimals)
                        )
                      }}
                    </template>
                  </Tooltip>
                </div>
              </template>
            </v-data-table>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
// import store from "@/store";
import VerifyByHacken from "./VerifyByHacken.vue";
import VerifyByEther from "./VerifyByEther.vue";
import EventBus from "@/components/EventBus";
import Overflow from "@/components/Text-Overflow/Overflow";
import Tooltip from "@/components/Tooltip/Tooltip";
import {
  dateTimeFormat,
  csvExport,
  formatUnits,
  getShorterText,
  calculateAge,
  getPercentage,
  numberWithCommas,
  getShorterNumber,
} from "@/utils/helpers";
import { COMMON_CONSTANTS, CAPABILITIES_NAMES } from "@/constants/common";
import { getTokenTransfers, getTokenHolders } from "@/services/moralis.service";
export default {
  name: "MyToken",
  components: {
    VerifyByHacken,
    Overflow,
    Tooltip,
    VerifyByEther,
  },
  data() {
    return {
      tab: 0,
      search: null,
      timeout: 2000,
      snackbar: false,
      text: `Contract Address Copied!`,
      searchTransfer: null,
      getVerified: false,
      getEhtherVerified: false,
      headers: [
        { text: "Rank", value: "id" },
        { text: "Address", value: "address" },
        { text: "Quantity", value: "balance" },
        { text: "Percentage", value: "max_supply" },
        { text: "Value", value: "value" },
        { text: "Analytics", value: "view", width: "%10" },
      ],
      headersTransfer: [
        { text: "Txn Hash", value: "transaction_hash" },
        // { text: "Method", value: "blockchain_name" },
        { text: "Age", value: "createdAt" },
        { text: "From", value: "from_address" },
        { text: "To", value: "to_address" },
        { text: "Quantity", value: "value", width: "%10" },
      ],
      tokenHolders: [],
      tokenTransfers: [],
      CAPABILITIES_NAMES: CAPABILITIES_NAMES,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    allBlockchains() {
      return this.$store.state.base.blockChains;
    },
    blockchainName() {
      const blockchainList = this.$store.state.base.blockChains;
      return blockchainList[this.tokenDetail?.blockchain_id]?.chainName;
    },
    isCapabilityInluded() {
      return (capabilityName) => {
        return this.tokenDetail?.capabilities?.includes(capabilityName);
      };
    },
    getPValue() {
      return (quantity) => {
        return numberWithCommas(quantity * (this.tokenDetail?.value || 0));
      };
    },
    getNetworkUrl() {
      return (query) => {
        const blockchainList = this.$store.state.base.blockChains;
        return `${
          blockchainList[this.tokenDetail?.blockchain_id]?.blockExplorerUrl
        }${query}`;
      };
    },
    cloudName() {
      return COMMON_CONSTANTS.CLOUDINARY_CLOUD_NAME;
    },
    tokenDetail() {
      return this.$store.state.token.tokenDetail;
    },
    loading() {
      return this.$store.state.token.loading;
    },
    syncedAt() {
      if (this.tokenDetail && this.tokenDetail.updatedAt) {
        const dateTime = dateTimeFormat(this.tokenDetail.updatedAt);
        return dateTime;
      }
      return "";
    },
    isTokenOwner() {
      return (
        this.$store.state.auth?.ethAddress?.toLowerCase() ===
        this.tokenDetail?.ether_address?.toLowerCase()
      );
    },
  },
  watch: {
    tokenDetail: function (newOne) {
      if (newOne.blockchain_id) {
        this.getTokenData(this.$route.params.tokenAddress);
      }
    },
  },
  methods: {
    getPercentage,
    numberWithCommas,
    formatUnits,
    getShorterText,
    calculateAge,
    getShorterNumber,
    // getTokenExchnage,
    copyAddress(txt) {
      navigator.clipboard.writeText(txt);
      this.$store.dispatch("createSnackBar", {
        message: "copied",
      });
    },

    csvExport(arrData, notDeleteAbleFields, fileName = "download") {
      arrData = arrData.map((item) => {
        if (fileName === "Holders") {
          item.balance = formatUnits(item.balance, this.tokenDetail.decimals);
        } else if (fileName === "Transfers") {
          item.dataTime = item.createdAt;
          item.value = formatUnits(item.value, this.tokenDetail.decimals);
        }
        return item;
      });
      csvExport(arrData, notDeleteAbleFields, fileName);
    },

    syncTokenDetail() {
      this.$store.dispatch("syncTokenDetail", { token: this.tokenDetail });
      // this.getTokenData(this.$route.params.tokenAddress);
    },

    async getTokenData(tokenAddress) {
      const tokenTransfers = await getTokenTransfers(
        tokenAddress,
        this.tokenDetail?.blockchain_id
      );
      this.tokenTransfers = tokenTransfers;

      const tokenHolders = await getTokenHolders(
        tokenAddress,
        this.tokenDetail?.blockchain_id,
        tokenTransfers
      );
      this.tokenHolders = tokenHolders;
    },
  },
  mounted() {
    this.getTokenData(this.$route.params.tokenAddress);

    this.$store.dispatch("getTokenDetail", {
      tokenAddress: this.$route.params.tokenAddress,
    });
    this.image = "'img/my-token-background'";

    EventBus.$on("onAuditStatusChange", () => {
      this.tokenDetail.hacken_audit_status = "Requested";
      this.getVerified = false;
    });
  },
};
</script>

<style lang="scss">
@import "./_tokenprofile.scss";
</style>
