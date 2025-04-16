"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/src/lib"
import { PlusIcon, TrashIcon, AlertCircleIcon, ActivityIcon } from "lucide-react"
import { anatomicalRegions, interventionZones } from "./types"
import { AddAnatomicalIssueDialog } from "./AddAnatomicalIssueDialog"

interface AnatomicalIssue {
  id: string
  type: "dysfunction" | "anatomicalSuspicion"
  region: string
  severity: number
  notes: string
  interventionZone?: string
  laterality: "left" | "right" | "bilateral"
}

interface AnatomicalRegionMap {
  [key: string]: {
    left: {
      path: string
      viewBox: string
      transform?: string
    }
    right: {
      path: string
      viewBox: string
      transform?: string
    }
  }
}

// Carte des régions anatomiques avec les coordonnées SVG pour chaque côté
const anatomicalRegionPaths: AnatomicalRegionMap = {
  C1: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  C2: {
    right: {
      path: "M21.9331 19.3262C20.7397 19.3262 19.2361 19.5728 18.6123 18.3061C18.0971 17.2599 18.0158 15.9014 18.1798 14.736C18.3638 13.4283 19.4895 12.2371 19.9239 11.0242C20.327 9.89877 20.6982 8.68685 21.2355 7.59578C22.024 5.99443 22.047 3.14959 20.789 1.87225C18.6421 -0.307645 16.3546 2.15866 14.3986 3.20397C12.1316 4.41544 10.6546 7.86962 9.51511 10.0184C8.49701 11.9382 7.227 14.4809 5.41299 15.756C1.90234 18.2238 -1.62317 27.5458 3.79447 29.5832C6.64285 30.6543 11.4431 31.5444 13.0173 34.3858C13.7568 35.7207 13.7951 37.4643 13.6312 38.9618C13.4507 40.611 12.0247 41.9559 11.6917 43.6086C11.3621 45.2449 11.1336 46.7299 11.1336 48.3971C11.1336 49.8139 13.5619 48.312 14.1474 48.1421C15.969 47.6137 18.4521 45.0158 18.6681 43.0419C18.9284 40.6637 19.4216 38.1828 19.4216 35.76C19.4216 34.4019 19.8682 33.076 19.6588 31.6941C19.4643 30.4106 19.1013 29.3311 19.1704 27.9964C19.2846 25.7944 23.2141 25.1399 23.6772 23.0238C23.84 22.28 24.2289 21.2269 23.8167 20.4737C23.4297 19.7663 22.4613 19.3788 22.1842 18.8161",
      viewBox: "0 0 5 10",
      transform: "translate(365, 90) scale(0.55)",
    },
    left: {
      path: "M3.0669 19.3262C4.26034 19.3262 5.76392 19.5728 6.38767 18.3061C6.90287 17.2599 6.98417 15.9014 6.8202 14.736C6.63621 13.4283 5.51048 12.2371 5.0761 11.0242C4.67304 9.89877 4.30182 8.68685 3.76454 7.59578C2.97598 5.99443 2.95302 3.14959 4.21103 1.87225C6.35795 -0.307645 8.64537 2.15866 10.6014 3.20397C12.8684 4.41544 14.3454 7.86962 15.4849 10.0184C16.503 11.9382 17.773 14.4809 19.587 15.756C23.0977 18.2238 26.6232 27.5458 21.2055 29.5832C18.3571 30.6543 13.5569 31.5444 11.9827 34.3858C11.2432 35.7207 11.2049 37.4643 11.3688 38.9618C11.5493 40.611 12.9753 41.9559 13.3083 43.6086C13.6379 45.2449 13.8664 46.7299 13.8664 48.3971C13.8664 49.8139 11.4381 48.312 10.8526 48.1421C9.03099 47.6137 6.54786 45.0158 6.33185 43.0419C6.07161 40.6637 5.5784 38.1828 5.5784 35.76C5.5784 34.4019 5.13181 33.076 5.34121 31.6941C5.53568 30.4106 5.89874 29.3311 5.82955 27.9964C5.71541 25.7944 1.78594 25.1399 1.3228 23.0238C1.16001 22.28 0.771134 21.2269 1.18327 20.4737C1.57034 19.7663 2.53866 19.3788 2.81575 18.8161",
      viewBox: "200 200 15 25",
      transform: "translate(120, 90) scale(0.55)",
    },
  },
  C3: {
    right: {
      path: "M12.5888 11.0218C12.5888 10.541 12.6612 10.1823 12.7626 9.72583C12.8363 9.39414 12.8306 8.91378 12.9662 8.60866C13.3722 7.69515 13.3038 6.47177 13.3038 5.48057C13.3038 4.1476 12.9554 2.50545 11.7646 1.72686C11.5396 1.57975 11.2151 1.43447 10.9602 1.3495C10.714 1.26743 10.3418 1.263 10.131 1.14593C9.80236 0.963338 9.17648 0.882413 9.01385 1.32964C8.7105 2.16386 8.26057 3.08235 7.53918 3.64344C6.66328 4.32469 5.28689 4.02664 4.25717 4.05058C3.71638 4.06316 2.83732 4.36383 2.35549 4.63151C2.17183 4.73354 1.9675 4.7234 1.81924 4.9046C1.55139 5.23198 1.4167 5.63905 1.23831 6.01681C0.93308 6.66318 0.977193 7.72626 1.06453 8.42494C1.15185 9.12354 2.17108 9.05553 2.66333 9.05553C3.2498 9.05553 3.74356 9.06059 4.29689 8.89664C4.95896 8.70047 5.53967 8.94157 6.06451 9.27896C6.6948 9.68415 6.51138 10.9297 6.51138 11.558C6.51138 12.3778 6.29332 12.853 5.97513 13.5689C5.89041 13.7595 5.65818 14.0038 5.6226 14.1995C5.56089 14.5389 5.51682 14.9122 5.41903 15.2422C5.21185 15.9414 5.71147 16.2163 6.24822 16.5183C6.55176 16.689 6.76495 16.8553 6.9086 17.1836C7.01332 17.423 6.97601 17.7272 7.08734 17.9433C7.29396 18.3444 8.07955 18.5592 8.49747 18.4199C8.98828 18.2563 9.33067 17.7248 9.86787 17.7248C10.406 17.7248 10.7876 17.9929 11.3177 17.9929C11.9692 17.9929 12.5376 16.9266 12.9016 16.4785C13.254 16.0448 13.6177 15.6295 13.9691 15.1776C14.6829 14.2599 14.3961 13.0078 13.6166 12.2283C13.2878 11.8995 12.7584 11.7203 12.5193 11.2899C12.4038 11.082 12.1374 10.3537 12.4101 10.2174",
      viewBox: "0 0 15 19",
      transform: "translate(360, 106) scale(1)",
    },
    left: {
      path: "M2.78912 11.0218C2.78912 10.541 2.71677 10.1823 2.61534 9.72583C2.54163 9.39414 2.54737 8.91378 2.41176 8.60866C2.00576 7.69515 2.07413 6.47177 2.07413 5.48057C2.07413 4.1476 2.42256 2.50545 3.61335 1.72686C3.83834 1.57975 4.16282 1.43447 4.41771 1.3495C4.66392 1.26743 5.03617 1.263 5.24691 1.14593C5.57557 0.963338 6.20145 0.882413 6.36408 1.32964C6.66743 2.16386 7.11736 3.08235 7.83875 3.64344C8.71465 4.32469 10.091 4.02664 11.1208 4.05058C11.6616 4.06316 12.5406 4.36383 13.0224 4.63151C13.2061 4.73354 13.4104 4.7234 13.5587 4.9046C13.8265 5.23198 13.9612 5.63905 14.1396 6.01681C14.4448 6.66318 14.4007 7.72626 14.3134 8.42494C14.2261 9.12354 13.2068 9.05553 12.7146 9.05553C12.1281 9.05553 11.6344 9.06059 11.081 8.89664C10.419 8.70047 9.83826 8.94157 9.31342 9.27896C8.68313 9.68415 8.86655 10.9297 8.86655 11.558C8.86655 12.3778 9.08461 12.853 9.4028 13.5689C9.48752 13.7595 9.71974 14.0038 9.75533 14.1995C9.81704 14.5389 9.86111 14.9122 9.9589 15.2422C10.1661 15.9414 9.66646 16.2163 9.12971 16.5183C8.82617 16.689 8.61298 16.8553 8.46933 17.1836C8.36461 17.423 8.40192 17.7272 8.29059 17.9433C8.08397 18.3444 7.29838 18.5592 6.88046 18.4199C6.38965 18.2563 6.04726 17.7248 5.51006 17.7248C4.97193 17.7248 4.5903 17.9929 4.06022 17.9929C3.40876 17.9929 2.84035 16.9266 2.47631 16.4785C2.12392 16.0448 1.76026 15.6295 1.40879 15.1776C0.695009 14.2599 0.981833 13.0078 1.76132 12.2283C2.09016 11.8995 2.6195 11.7203 2.85863 11.2899C2.97415 11.082 3.24055 10.3537 2.96787 10.2174",
      viewBox: "0 0 15 19",
      transform: "translate(125, 105) scale(1)",
    },
  },
  C4: {
    right: {
      path: "M26.2111 17.1974C24.5093 17.1974 24.1942 15.1907 24.1942 13.8359C24.1942 12.8967 24.0636 11.8284 24.3312 10.9227C24.5703 10.1133 25.0255 9.38742 25.2898 8.59452C25.4188 8.20749 25.3147 7.62518 25.3147 7.22503C25.3147 5.89507 25.7102 3.47473 24.6424 2.40691C24.26 2.02449 23.892 1.68638 23.4348 1.39846C22.6659 0.914349 21.5234 1.06232 20.6646 1.06232C18.9482 1.06232 17.9332 2.32618 16.4379 2.88C16.0785 3.01311 15.5218 3.25608 15.1182 3.0543C14.534 2.76219 14.394 1.80722 13.9417 1.35489C13.1605 0.57365 12.015 1.20776 11.6447 2.04586C11.3051 2.81429 10.7734 3.40866 10.7483 4.31174C10.7255 5.13195 10.7483 5.95628 10.7483 6.77683C10.7483 8.85897 11.8377 11.2015 10.9724 13.2508C10.6434 14.0298 10.0627 14.5956 9.65269 15.2926C9.42012 15.688 8.27796 15.57 7.89103 15.5104C7.34937 15.4271 6.82913 14.742 6.37837 14.4522C5.82805 14.0984 5.19438 14.06 4.56068 14.06C3.36361 14.06 2.66681 14.0179 1.95864 15.1307C1.26124 16.2266 1 17.4917 1 18.7661C1 19.3376 1.71213 19.5189 2.09559 19.7745C2.75561 20.2146 3.60177 20.2566 4.36148 20.341C5.51388 20.4691 6.60482 20.8536 7.55488 21.5113C8.08401 21.8776 9.01205 22.1128 9.26675 22.775C9.4398 23.2249 9.41907 23.7309 9.60289 24.1445C9.8039 24.5967 9.58768 24.6869 10.132 24.9288C11.4073 25.4956 12.9518 25.3259 14.3276 25.6011C15.0009 25.7358 15.7132 25.7618 16.1827 26.3357C16.5964 26.8414 16.3368 27.6879 16.0146 28.1533C15.6763 28.6421 15.331 29.1439 15.0062 29.6598C14.627 30.2619 14.1775 30.9276 13.8296 31.5459C13.0637 32.9076 12.4275 34.3624 11.7816 35.7976C11.1054 37.3004 11.7799 38.2733 12.9893 39.1528C13.5553 39.5645 14.3238 39.7408 15.0062 39.5512C15.9368 39.2927 16.5306 38.789 17.3592 38.3747C17.9328 38.0879 18.453 37.8161 18.9279 37.3663C19.55 36.7769 20.4541 36.5293 21.1128 35.9719C21.6663 35.5036 22.4066 35.0783 23.0177 34.6709C23.8303 34.1292 24.6418 33.5602 25.4267 32.9715C25.7461 32.732 26.0864 32.519 26.4352 32.3241C26.8324 32.1021 27.0842 31.6281 27.4436 31.3405C28.0025 30.8935 28.5927 30.4417 29.1306 29.971C29.877 29.3179 30.525 28.5579 31.1475 27.7798C31.8128 26.9482 32.7241 26.2031 33.2453 25.265C34.1148 23.6998 34.6417 20.9342 32.7099 19.9115C31.7187 19.3867 30.7536 19.7496 29.8029 20.2725C29.5355 20.4196 26.823 22.3335 26.7713 21.4553C26.7449 21.0064 26.747 20.5549 26.9083 20.1356C27.0608 19.7391 27.3316 19.3879 27.3316 18.9342C27.3316 18.0402 26.7852 17.5428 26.099 17.0854",
      viewBox: "0 0 35 41",
      transform: "translate(353, 112) scale(0.55)",
    },
    left: {
      path: "M8.81702 17.1974C10.5188 17.1974 10.8339 15.1907 10.8339 13.8359C10.8339 12.8967 10.9646 11.8284 10.697 10.9227C10.4578 10.1133 10.0026 9.38742 9.73831 8.59452C9.6093 8.20749 9.71341 7.62518 9.71341 7.22503C9.71341 5.89507 9.31789 3.47473 10.3857 2.40691C10.7681 2.02449 11.1361 1.68638 11.5934 1.39846C12.3622 0.914349 13.5047 1.06232 14.3635 1.06232C16.0799 1.06232 17.0949 2.32618 18.5902 2.88C18.9496 3.01311 19.5063 3.25608 19.9099 3.0543C20.4941 2.76219 20.6341 1.80722 21.0864 1.35489C21.8677 0.57365 23.0131 1.20776 23.3834 2.04586C23.723 2.81429 24.2547 3.40866 24.2798 4.31174C24.3026 5.13195 24.2798 5.95628 24.2798 6.77683C24.2798 8.85897 23.1905 11.2015 24.0557 13.2508C24.3847 14.0298 24.9654 14.5956 25.3754 15.2926C25.608 15.688 26.7501 15.57 27.1371 15.5104C27.6787 15.4271 28.199 14.742 28.6497 14.4522C29.2001 14.0984 29.8337 14.06 30.4674 14.06C31.6645 14.06 32.3613 14.0179 33.0695 15.1307C33.7669 16.2266 34.0281 17.4917 34.0281 18.7661C34.0281 19.3376 33.316 19.5189 32.9325 19.7745C32.2725 20.2146 31.4263 20.2566 30.6666 20.341C29.5142 20.4691 28.4233 20.8536 27.4732 21.5113C26.9441 21.8776 26.0161 22.1128 25.7614 22.775C25.5883 23.2249 25.609 23.7309 25.4252 24.1445C25.2242 24.5967 25.4404 24.6869 24.8961 24.9288C23.6208 25.4956 22.0763 25.3259 20.7005 25.6011C20.0272 25.7358 19.3149 25.7618 18.8454 26.3357C18.4317 26.8414 18.6913 27.6879 19.0135 28.1533C19.3518 28.6421 19.6971 29.1439 20.0219 29.6598C20.4011 30.2619 20.8506 30.9276 21.1985 31.5459C21.9644 32.9076 22.6006 34.3624 23.2465 35.7976C23.9227 37.3004 23.2482 38.2733 22.0388 39.1528C21.4729 39.5645 20.7044 39.7408 20.0219 39.5512C19.0913 39.2927 18.4975 38.789 17.6689 38.3747C17.0953 38.0879 16.5751 37.8161 16.1002 37.3663C15.4781 36.7769 14.574 36.5293 13.9153 35.9719C13.3618 35.5036 12.6215 35.0783 12.0104 34.6709C11.1978 34.1292 10.3863 33.5602 9.60136 32.9715C9.28202 32.732 8.94166 32.519 8.59292 32.3241C8.1957 32.1021 7.94396 31.6281 7.58448 31.3405C7.02564 30.8935 6.43542 30.4417 5.89751 29.971C5.15111 29.3179 4.50307 28.5579 3.88062 27.7798C3.21528 26.9482 2.30401 26.2031 1.78281 25.265C0.913284 23.6998 0.386389 20.9342 2.31816 19.9115C3.30939 19.3867 4.2745 19.7496 5.22522 20.2725C5.49262 20.4196 8.20511 22.3335 8.25677 21.4553C8.28318 21.0064 8.28108 20.5549 8.11982 20.1356C7.96732 19.7391 7.69653 19.3879 7.69653 18.9342C7.69653 18.0402 8.2429 17.5428 8.92907 17.0854",
      viewBox: "0 0 35 41",
      transform: "translate(130, 112) scale(0.55)",
    },
  },
  C5: {
    right: {
      path: "M6.70761 4.80555C6.70761 3.92087 6.71313 3.04592 6.62609 2.17556C6.54214 1.33608 4.89548 0.399835 4.52811 1.50197C4.35847 2.01087 4.4863 2.52244 4.37365 3.02934C4.26163 3.53346 4.18096 3.97756 4.00468 4.46232C3.79406 5.04151 3.46181 5.59823 3.23242 6.17846C2.99908 6.76866 2.64765 7.33114 2.11263 7.70154C1.67807 8.00239 1.2363 8.22841 1.03575 8.7441C0.911566 9.06343 1.13648 9.27529 1.31892 9.51636C1.60154 9.88982 1.84408 10.2605 2.09118 10.6576C2.34546 11.0663 2.64803 11.4527 2.8849 11.8718C3.11991 12.2876 3.55086 12.5498 3.84594 12.9186C4.13257 13.2769 4.31776 13.6198 4.68256 13.9183C4.97501 14.1576 5.33764 14.4388 5.54921 14.7506C5.82874 15.1625 6.13148 15.5968 6.30431 16.0635C6.45048 16.4581 6.6979 16.7538 6.86206 17.1232C7.0353 17.513 7.33838 17.86 7.53994 18.243C7.78404 18.7068 8.15006 18.7638 8.63827 18.8994C9.75956 19.2108 10.6984 18.1907 11.4184 17.4707C12.0905 16.7987 12.6809 15.973 12.1478 15.0037C11.8938 14.542 11.3383 14.1231 11.4227 13.5321C11.4612 13.2627 11.7629 13.1519 11.959 13.0087C12.2707 12.7813 12.5825 12.5233 12.8085 12.2021C13.2947 11.5113 13.7555 10 13.0402 9.28468C12.7666 9.01109 12.5333 8.7441 12.1135 8.7441C11.6381 8.7441 11.2523 8.61877 10.8392 8.43519C10.1238 8.11722 10.2778 6.93453 9.68083 6.47021C9.34976 6.21271 8.7602 6.2168 8.36798 6.27714C7.9411 6.34281 7.53289 6.35008 7.09374 6.35008C6.19339 6.35008 6.6003 5.28193 6.78483 4.72832",
      viewBox: "0 0 14 20",
      transform: "translate(100, 200) scale(1)",
    },
    left: {
      path: "M7.70182 4.80555C7.70182 3.92087 7.6963 3.04592 7.78333 2.17556C7.86728 1.33608 9.51394 0.399835 9.88132 1.50197C10.051 2.01087 9.92313 2.52244 10.0358 3.02934C10.1478 3.53346 10.2285 3.97756 10.4047 4.46232C10.6154 5.04151 10.9476 5.59823 11.177 6.17846C11.4103 6.76866 11.7618 7.33114 12.2968 7.70154C12.7314 8.00239 13.1731 8.22841 13.3737 8.7441C13.4979 9.06343 13.2729 9.27529 13.0905 9.51636C12.8079 9.88982 12.5653 10.2605 12.3182 10.6576C12.064 11.0663 11.7614 11.4527 11.5245 11.8718C11.2895 12.2876 10.8586 12.5498 10.5635 12.9186C10.2769 13.2769 10.0917 13.6198 9.72687 13.9183C9.43441 14.1576 9.07179 14.4388 8.86021 14.7506C8.58068 15.1625 8.27795 15.5968 8.10511 16.0635C7.95894 16.4581 7.71152 16.7538 7.54736 17.1232C7.37412 17.513 7.07104 17.86 6.86949 18.243C6.62538 18.7068 6.25937 18.7638 5.77115 18.8994C4.64986 19.2108 3.71103 18.1907 2.991 17.4707C2.31897 16.7987 1.72856 15.973 2.26164 15.0037C2.51561 14.542 3.07113 14.1231 2.98671 13.5321C2.94822 13.2627 2.64657 13.1519 2.45042 13.0087C2.13872 12.7813 1.82695 12.5233 1.60092 12.2021C1.11476 11.5113 0.653931 10 1.36924 9.28468C1.64284 9.01109 1.87611 8.7441 2.29596 8.7441C2.77131 8.7441 3.15714 8.61877 3.5702 8.43519C4.28564 8.11722 4.13161 6.93453 4.7286 6.47021C5.05966 6.21271 5.64922 6.2168 6.04145 6.27714C6.46832 6.34281 6.87653 6.35008 7.31568 6.35008C8.21603 6.35008 7.80913 5.28193 7.62459 4.72832",
      viewBox: "0 0 14 20",
      transform: "translate(100, 200) scale(1)",
    },
  },
  C6: {
    right: {
      path: "M8.75873 6.12516C7.6172 6.12516 7.33507 5.13455 7.33507 4.20322C7.33507 3.71681 7.33507 3.23039 7.33507 2.74398C7.33507 2.36396 7.40085 1.81047 7.12153 1.49828C6.83391 1.17682 6.6286 1 6.19615 1C5.80134 1 5.29615 1.43767 5.12841 1.78301C4.87715 2.3003 4.78738 2.94102 4.63013 3.4914C4.4571 4.09701 4.28263 4.73879 4.06067 5.32633C3.73141 6.19789 3.3626 7.03663 2.49465 7.49345C2.18282 7.65757 1.96535 7.96303 1.60486 8.04314C1.47939 8.07102 1.28845 8.09238 1.17776 8.15387C0.957966 8.27598 0.911715 8.1689 1.21336 8.41883C1.5421 8.69122 1.7109 9.09779 1.99637 9.39957C2.30849 9.72953 2.60661 10.1297 2.81101 10.5385C3.18475 11.286 3.6895 11.9415 4.07649 12.674C4.86048 14.158 6.05298 15.4929 7.08198 16.8026C7.37822 17.1796 7.63422 17.5288 7.97572 17.8703C8.32387 18.2185 9.03781 18.2231 9.50615 18.1511C9.89297 18.0916 10.5116 17.723 10.7914 17.4432C11.0858 17.1489 11.3451 16.7972 11.5704 16.4467C12.0214 15.7453 12.4602 15.4541 12.4602 14.5643C12.4602 14.1812 12.1755 13.8805 12.1755 13.4728C12.1755 12.7504 12.6216 12.122 13.0297 11.539C13.7949 10.4459 14.1686 9.28222 14.1686 7.94032C14.1686 7.17988 12.0417 7.33263 11.5704 7.26013C11.0481 7.17976 11.0378 7.07109 10.8388 6.62344C10.7142 6.34298 10.6707 6.07153 10.2892 5.98675C9.58147 5.82949 8.93225 5.76925 8.18927 5.76925",
      viewBox: "0 0 15 19",
      transform: "translate(345, 117) scale(1)",
    },
    left: {
      path: "M6.40988 6.12516C7.55141 6.12516 7.83353 5.13455 7.83353 4.20322C7.83353 3.71681 7.83353 3.23039 7.83353 2.74398C7.83353 2.36396 7.76775 1.81047 8.04708 1.49828C8.3347 1.17682 8.54001 1 8.97246 1C9.36727 1 9.87246 1.43767 10.0402 1.78301C10.2915 2.3003 10.3812 2.94102 10.5385 3.4914C10.7115 4.09701 10.886 4.73879 11.1079 5.32633C11.4372 6.19789 11.806 7.03663 12.674 7.49345C12.9858 7.65757 13.2033 7.96303 13.5637 8.04314C13.6892 8.07102 13.8802 8.09238 13.9908 8.15387C14.2106 8.27598 14.2569 8.1689 13.9553 8.41883C13.6265 8.69122 13.4577 9.09779 13.1722 9.39957C12.8601 9.72953 12.562 10.1297 12.3576 10.5385C11.9839 11.286 11.4791 11.9415 11.0921 12.674C10.3081 14.158 9.11563 15.4929 8.08663 16.8026C7.79039 17.1796 7.53439 17.5288 7.19289 17.8703C6.84474 18.2185 6.1308 18.2231 5.66246 18.1511C5.27564 18.0916 4.65697 17.723 4.37722 17.4432C4.08284 17.1489 3.8235 16.7972 3.59816 16.4467C3.14726 15.7453 2.70837 15.4541 2.70837 14.5643C2.70837 14.1812 2.99311 13.8805 2.99311 13.4728C2.99311 12.7504 2.54703 12.122 2.13891 11.539C1.37374 10.4459 0.999989 9.28222 0.999989 7.94032C0.999989 7.17988 3.12692 7.33263 3.59816 7.26013C4.12055 7.17976 4.13081 7.07109 4.32976 6.62344C4.45441 6.34298 4.49791 6.07153 4.87945 5.98675C5.58714 5.82949 6.23636 5.76925 6.97934 5.76925",
      viewBox: "0 0 15 19",
      transform: "translate(140, 120) scale(1)",
    },
  },
  C7: {
    right: {
      path: "M9.40193 6.08187C8.71469 6.08187 8.03987 6.18518 7.44416 5.85423C6.84412 5.52087 6.76122 4.68314 6.76122 4.07857C6.76122 3.2624 6.94682 2.47795 6.76628 1.66551C6.63868 1.09134 5.3314 0.759065 4.98051 1.21021C4.40381 1.95168 3.93056 2.579 3.68544 3.53222C3.38802 4.68886 2.90526 5.73105 2.43085 6.81541C2.22712 7.28107 1.96936 7.95984 1.61638 8.31282C1.35793 8.57127 1.03907 9.05197 1.02449 9.43083C1.01059 9.79231 0.932436 10.3018 1.15602 10.5893C1.58874 11.1456 2.03186 11.5108 2.66356 11.8388C4.00111 12.5333 5.11432 13.6336 5.21827 15.1928C5.28251 16.1564 5.75424 18.0094 6.87251 18.2636C8.15555 18.5552 9.50176 18.5588 10.3581 17.3732C11.1211 16.3167 12.3776 15.3337 12.2197 13.913C12.1466 13.2554 11.5238 12.7665 11.4103 12.1424C11.2899 11.48 11.7078 11.0098 11.9516 10.4325C12.2087 9.82356 12.5936 9.53541 12.9532 9.016C13.4252 8.33422 13.1214 7.9122 12.7003 7.24541C12.3709 6.7238 11.1712 7.3567 10.6768 7.3567C10.2591 7.3567 10.0462 7.18262 9.95334 6.76482C9.85248 6.31095 9.97512 6.34259 9.58405 6.08187",
      viewBox: "0 0 14 19",
      transform: "translate(337, 120) scale(1)",
    },
    left: {
      path: "M4.79015 6.08187C5.47739 6.08187 6.15221 6.18518 6.74792 5.85423C7.34796 5.52087 7.43086 4.68314 7.43086 4.07857C7.43086 3.2624 7.24526 2.47795 7.4258 1.66551C7.5534 1.09134 8.86068 0.759065 9.21157 1.21021C9.78827 1.95168 10.2615 2.579 10.5066 3.53222C10.8041 4.68886 11.2868 5.73105 11.7612 6.81541C11.965 7.28107 12.2227 7.95984 12.5757 8.31282C12.8341 8.57127 13.153 9.05197 13.1676 9.43083C13.1815 9.79231 13.2596 10.3018 13.0361 10.5893C12.6033 11.1456 12.1602 11.5108 11.5285 11.8388C10.191 12.5333 9.07776 13.6336 8.97381 15.1928C8.90957 16.1564 8.43784 18.0094 7.31957 18.2636C6.03653 18.5552 4.69032 18.5588 3.83403 17.3732C3.07099 16.3167 1.81451 15.3337 1.97237 13.913C2.04543 13.2554 2.66831 12.7665 2.78179 12.1424C2.90221 11.48 2.48425 11.0098 2.24049 10.4325C1.98339 9.82356 1.59844 9.53541 1.23884 9.016C0.766841 8.33422 1.07066 7.9122 1.49179 7.24541C1.82122 6.7238 3.02086 7.3567 3.51532 7.3567C3.93299 7.3567 4.14589 7.18262 4.23873 6.76482C4.33959 6.31095 4.21695 6.34259 4.60803 6.08187",
      viewBox: "0 0 14 19",
      transform: "translate(148, 120) scale(1)",
    },
  },
  T1: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T2: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T3: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T4: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T5: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T6: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T7: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T8: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T9: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T10: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T11: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T12: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  T13: {
    right: {
      path: "",
      viewBox: "",
      transform: "",
    },
    left: {
      path: "",
      viewBox: "",
      transform: "",
    },
  },
  head: {
    left: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
    right: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
  },
  neck: {
    left: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
    right: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
  },
  back: {
    left: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
    right: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
  },
  chest: {
    left: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
    right: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
  },
  lungs: {
    left: {
      path: "M125,130 C135,120 145,118 155,122 C165,130 168,145 160,155 C150,165 135,165 125,160 C118,150 115,140 125,130",
      viewBox: "115 115 60 60",
    },
    right: {
      path: "M125,130 C135,120 145,118 155,122 C165,130 168,145 160,155 C150,165 135,165 125,160 C118,150 115,140 125,130",
      viewBox: "115 115 60 60",
    },
  },
  frontLeg: {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  hindLeg: {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  tail: {
    left: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
    right: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
  },
  // Mapping pour les régions anatomiques existantes dans le fichier types.ts
  tete: {
    left: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
    right: {
      path: "M40,50 Q60,30 80,50 Q100,70 80,90 Q60,110 40,90 Q20,70 40,50Z",
      viewBox: "0 0 120 140",
    },
  },
  cou: {
    left: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
    right: {
      path: "M75,90 Q85,80 95,90 L105,120 Q95,130 85,120 L75,90Z",
      viewBox: "70 80 40 60",
    },
  },
  thorax: {
    left: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
    right: {
      path: "M105,130 Q130,120 150,130 L150,160 Q130,170 105,160 L105,130Z",
      viewBox: "100 120 55 50",
    },
  },
  dos: {
    left: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
    right: {
      path: "M110,120 Q160,100 200,120 L200,140 Q160,160 110,140 L110,120Z",
      viewBox: "100 100 110 60",
    },
  },
  queue: {
    left: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
    right: {
      path: "M240,140 Q250,135 260,140 L280,190 Q270,195 260,190 L240,140Z",
      viewBox: "235 135 50 65",
    },
  },
  "patte-avant-gauche": {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  "patte-avant-droite": {
    left: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
    right: {
      path: "M110,160 Q120,155 130,160 L140,220 Q130,225 120,220 L110,160Z",
      viewBox: "105 155 40 75",
    },
  },
  "patte-arriere-gauche": {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  "patte-arriere-droite": {
    left: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
    right: {
      path: "M210,160 Q220,155 230,160 L240,220 Q230,225 220,220 L210,160Z",
      viewBox: "205 155 40 75",
    },
  },
  "oeil-gauche": {
    left: {
      path: "M45,60 C50,55 55,55 60,60 C65,65 65,70 60,75 C55,80 50,80 45,75 C40,70 40,65 45,60",
      viewBox: "35 50 30 30",
    },
    right: {
      path: "M45,60 C50,55 55,55 60,60 C65,65 65,70 60,75 C55,80 50,80 45,75 C40,70 40,65 45,60",
      viewBox: "35 50 30 30",
    },
  },
  "oeil-droit": {
    left: {
      path: "M65,60 C70,55 75,55 80,60 C85,65 85,70 80,75 C75,80 70,80 65,75 C60,70 60,65 65,60",
      viewBox: "55 50 30 30",
    },
    right: {
      path: "M65,60 C70,55 75,55 80,60 C85,65 85,70 80,75 C75,80 70,80 65,75 C60,70 60,65 65,60",
      viewBox: "55 50 30 30",
    },
  },
  "oreille-gauche": {
    left: {
      path: "M30,40 Q35,30 45,35 Q50,45 45,55 Q35,60 30,50 Q25,45 30,40",
      viewBox: "20 25 35 40",
    },
    right: {
      path: "M30,40 Q35,30 45,35 Q50,45 45,55 Q35,60 30,50 Q25,45 30,40",
      viewBox: "20 25 35 40",
    },
  },
  "oreille-droite": {
    left: {
      path: "M75,40 Q70,30 60,35 Q55,45 60,55 Q70,60 75,50 Q80,45 75,40",
      viewBox: "50 25 35 40",
    },
    right: {
      path: "M75,40 Q70,30 60,35 Q55,45 60,55 Q70,60 75,50 Q80,45 75,40",
      viewBox: "50 25 35 40",
    },
  },
  poumons: {
    left: {
      path: "M120,140 C135,130 155,125 175,135 C185,145 190,160 185,175 C175,190 160,195 140,190 C125,185 115,175 110,160 C105,145 110,145 120,140 Z",
      viewBox: "100 125 95 75",
      transform: "translate(200, 120) scale(0.5)",
    },
    right: {
      path: "M120,140 C135,130 155,125 175,135 C185,145 190,160 185,175 C175,190 160,195 140,190 C125,185 115,175 110,160 C105,145 110,145 120,140 Z",
      viewBox: "100 125 100 100",
      transform: "translate(130, 120) scale(0.5) scaleX(-1)",
    },
  },
}

interface AnatomicalEvaluationTabProps {
  dysfunctions: AnatomicalIssue[]
  setDysfunctions: (dysfunctions: AnatomicalIssue[]) => void
  onAddDysfunction: (dysfunction: Omit<AnatomicalIssue, "id">) => void
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
}

export function AnatomicalEvaluationTab({
  dysfunctions,
  setDysfunctions,
  onAddDysfunction,
  isAddModalOpen,
  setIsAddModalOpen,
}: AnatomicalEvaluationTabProps) {
  const [newIssue, setNewIssue] = useState<Omit<AnatomicalIssue, "id">>({
    type: "dysfunction",
    region: "",
    severity: 2,
    notes: "",
    interventionZone: undefined,
    laterality: "left",
  })
  const [anatomicalView, setAnatomicalView] = useState<"gauche" | "droite">("gauche")

  const handleRemoveDysfunction = (id: string) => {
    setDysfunctions(dysfunctions.filter(d => d.id !== id))
  }

  const handleAddNewIssue = () => {
    if (!newIssue.region) return

    onAddDysfunction({
      ...newIssue,
    })

    // Réinitialiser le formulaire mais garder le type
    setNewIssue({
      type: "dysfunction",
      region: "",
      severity: 2,
      notes: "",
      interventionZone: undefined,
      laterality: "left",
    })

    // Fermer la modale
    setIsAddModalOpen(false)
  }

  const handleOpenAddModal = () => {
    setNewIssue({
      type: "dysfunction",
      region: "",
      severity: 2,
      notes: "",
      interventionZone: undefined,
      laterality: "left",
    })
    setIsAddModalOpen(true)
  }

  // Fonction pour afficher le niveau de sévérité
  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 1:
        return "Légère"
      case 2:
        return "Modérée"
      case 3:
        return "Importante"
      case 4:
        return "Sévère"
      case 5:
        return "Critique"
      default:
        return "Modérée"
    }
  }

  // Fonction pour obtenir la couleur selon la sévérité
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-orange-500"
      case 4:
        return "bg-red-500"
      case 5:
        return "bg-purple-500"
      default:
        return "bg-yellow-500"
    }
  }

  // Fonction pour obtenir la couleur de remplissage pour le SVG en fonction de la sévérité
  const getSeverityFillColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "rgba(34, 197, 94, 0.5)" // green-500 avec transparence
      case 2:
        return "rgba(234, 179, 8, 0.5)" // yellow-500 avec transparence
      case 3:
        return "rgba(249, 115, 22, 0.5)" // orange-500 avec transparence
      case 4:
        return "rgba(239, 68, 68, 0.5)" // red-500 avec transparence
      case 5:
        return "rgba(168, 85, 247, 0.5)" // purple-500 avec transparence
      default:
        return "rgba(234, 179, 8, 0.5)" // yellow-500 avec transparence
    }
  }

  // Fonction pour obtenir l'icône selon le type
  const getTypeIcon = (type: "dysfunction" | "anatomicalSuspicion") => {
    return type === "dysfunction" ? (
      <ActivityIcon className="h-4 w-4 text-primary" />
    ) : (
      <AlertCircleIcon className="h-4 w-4 text-amber-500" />
    )
  }

  // Fonction pour obtenir le libellé du type
  const getTypeLabel = (type: "dysfunction" | "anatomicalSuspicion") => {
    return type === "dysfunction" ? "Dysfonction" : "Suspicion d'atteinte"
  }

  // Fonction pour obtenir le libellé de latéralité
  const getLateralityLabel = (laterality: "left" | "right" | "bilateral") => {
    switch (laterality) {
      case "left":
        return "Gauche"
      case "right":
        return "Droite"
      case "bilateral":
        return "Bilatéral"
      default:
        return "Gauche"
    }
  }

  // Filtrer les dysfonctions selon la vue actuelle (gauche/droite)
  const filteredDysfunctions = dysfunctions.filter(dysfunction => {
    if (dysfunction.laterality === "bilateral") return true
    return (
      (anatomicalView === "gauche" && dysfunction.laterality === "left") ||
      (anatomicalView === "droite" && dysfunction.laterality === "right")
    )
  })

  // Fonction pour afficher le SVG des régions anatomiques sélectionnées
  const renderAnatomicalSVG = (dysfunctions: AnatomicalIssue[], side: "left" | "right") => {
    return (
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 500 380"
      >
        {dysfunctions.map(dysfunction => {
          const regionConfig = anatomicalRegionPaths[dysfunction.region]?.[side]
          if (!regionConfig) return null

          // Si le chemin SVG n'existe pas, ne rien afficher
          if (!regionConfig.path) return null

          // Utiliser la transformation pour positionner précisément l'élément
          return (
            <g key={dysfunction.id}>
              <path
                d={regionConfig.path}
                transform={regionConfig.transform || ""}
                fill={getSeverityFillColor(dysfunction.severity)}
                stroke={getSeverityFillColor(dysfunction.severity).replace("0.5", "0.8")}
                strokeWidth="2"
              />
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Évaluation anatomique</h2>
        <Button variant="default" size="sm" onClick={handleOpenAddModal} className="flex items-center gap-1">
          <PlusIcon className="h-4 w-4" />
          Ajouter un élément
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section gauche - Vue anatomique */}
        <div className="bg-gradient-to-b from-muted/10 to-background rounded-lg border p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Visualisation anatomique</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                variant={anatomicalView === "gauche" ? "default" : "outline"}
                className={cn(
                  "min-w-[100px]",
                  anatomicalView === "gauche" ? "bg-green-500 hover:bg-green-600 text-white" : ""
                )}
                onClick={() => setAnatomicalView("gauche")}
              >
                Gauche
              </Button>
              <Button
                variant={anatomicalView === "droite" ? "default" : "outline"}
                className="min-w-[100px]"
                onClick={() => setAnatomicalView("droite")}
              >
                Droite
              </Button>
            </div>
          </div>

          <div className="w-full max-w-md h-auto mx-auto overflow-hidden relative">
            {anatomicalView === "gauche" ? (
              <>
                <Image
                  src="/assets/images/dog-left-side.jpg"
                  alt="Vue anatomique côté gauche"
                  width={500}
                  height={380}
                  className="object-contain w-full h-auto"
                />
                {renderAnatomicalSVG(filteredDysfunctions, "left")}
              </>
            ) : (
              <>
                <Image
                  src="/assets/images/dog-right-side.jpg"
                  alt="Vue anatomique côté droit"
                  width={500}
                  height={380}
                  className="object-contain w-full h-auto"
                />
                {renderAnatomicalSVG(filteredDysfunctions, "right")}
              </>
            )}
          </div>
        </div>

        {/* Section droite - Liste des éléments */}
        <div className="rounded-lg border">
          <h3 className="p-3 border-b font-medium">Éléments identifiés</h3>

          <div className="p-4 max-h-[480px] overflow-y-auto">
            {dysfunctions.length > 0 ? (
              <div className="space-y-3">
                {dysfunctions.map(issue => (
                  <div
                    key={issue.id}
                    className="p-3 border rounded-md flex items-start justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn("w-3 h-3 rounded-full", getSeverityColor(issue.severity))} />
                        <div className="flex items-center gap-1.5">
                          {getTypeIcon(issue.type)}
                          <span className="text-xs font-medium text-muted-foreground">{getTypeLabel(issue.type)}</span>
                        </div>
                        <span className="font-medium">
                          {anatomicalRegions.find(r => r.value === issue.region)?.label}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          {getLateralityLabel(issue.laterality)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({issue.type === "dysfunction" ? "" : "Indice: "}
                          {getSeverityLabel(issue.severity)})
                        </span>

                        {issue.interventionZone && (
                          <span className="text-xs bg-muted/70 px-2 py-0.5 rounded-full">
                            {interventionZones.find(z => z.value === issue.interventionZone)?.label ||
                              issue.interventionZone}
                          </span>
                        )}
                      </div>
                      {issue.notes && <p className="text-sm text-muted-foreground">{issue.notes}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDysfunction(issue.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-3">
                <p>Aucun élément anatomique identifié</p>
                <Button variant="outline" size="sm" onClick={handleOpenAddModal} className="flex items-center gap-1">
                  <PlusIcon className="h-4 w-4" />
                  Ajouter un élément
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modale d'ajout de problème anatomique */}
      <AddAnatomicalIssueDialog
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        issueType={newIssue.type}
        newIssue={newIssue}
        setNewIssue={issue => setNewIssue(issue)}
        onAdd={handleAddNewIssue}
      />
    </div>
  )
}
