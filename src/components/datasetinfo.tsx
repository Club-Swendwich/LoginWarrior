import React from "react"
import { Dataset } from "../model/dataset"

export const DatasetInfoView = ({ maybeDataset } : { maybeDataset : Dataset | null }) => {
    if (maybeDataset === null) {
        return <div className="msgFail">Non è ancora stato caricato un dataset</div>
    } else {
        return <div>Il dataset ha { maybeDataset.size } righe!</div>
    }
}
