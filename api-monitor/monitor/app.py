
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict
import os

from service import run_monitor, build_config_path_by_type, CONFIG_BASE, TYPE_DIR

app = FastAPI(title="API Monitor Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/run/by-type")
def run_by_type(
    type: str = Query(...),
    code: str = Query(...),
    selected_group: Optional[str] = Query(None),
):
    print("\n================ BACKEND RECEIVED ================")
    print("TYPE =", type)
    print("CODE =", code)
    print("SELECTED_GROUP =", selected_group)
    print("=================================================\n")

    try:
        config_path = build_config_path_by_type(type, code)
        results = run_monitor(selected_group=selected_group, config_path=config_path)
        return {
            "config": os.path.basename(config_path),
            "count": len(results),
            "results": results
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/configs")
def list_configs() -> Dict[str, List[str]]:
    out: Dict[str, List[str]] = {}
    for t, folder in TYPE_DIR.items():
        dir_path = os.path.join(CONFIG_BASE, folder)
        if os.path.isdir(dir_path):
            files = [f for f in os.listdir(dir_path) if f.endswith("_config.json")]
            out[t] = sorted(files)
    return out