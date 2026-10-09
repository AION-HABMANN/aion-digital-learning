"""
Build every Word document of the manifest.  Usage:  python _tools/build_all.py [day ...]
Figures are drawn first (figs_dayN.py), then each reviewed Markdown file in _source/ becomes one .docx at the top level of materi-task-docx/.
"""
import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import md2docx  # noqa: E402

P = "Habmann-Digital-Learning"
# (source md, output file name). Names: Day{N}-{Materi|Task}-Habmann-Digital-Learning-{topic}.docx
MANIFEST = {
    1: [
        ("day1-materi.md", f"Day1-Materi-{P}-UX-vs-UI-and-User-Centred-Design.docx"),
        ("day1-task.md", f"Day1-Task-{P}-LearnFast-UX-Analysis-and-UX-Strategy-Memo.docx"),
    ],
    2: [
        ("day2-materi.md", f"Day2-Materi-{P}-Successful-Platforms-Prototyping-Testing-and-Adaptive-Learning.docx"),
        ("day2-task.md", f"Day2-Task-{P}-LearnPro-Prototype-and-Test-Plan-and-Innovation-Strategy.docx"),
    ],
    3: [
        ("day3-materi.md", f"Day3-Materi-{P}-Learning-Psychology-and-Cognitive-Load.docx"),
        ("day3-task.md", f"Day3-Task-{P}-EduCore-Cognitive-Load-Analysis-and-Learning-Experience-Strategy.docx"),
    ],
    4: [
        ("day4-materi.md", f"Day4-Materi-{P}-Motivation-and-Engagement-by-Design.docx"),
        ("day4-task.md", f"Day4-Task-{P}-MotivaLearn-Engagement-Analysis-and-Engagement-Strategy.docx"),
    ],
    5: [
        ("day5-materi.md", f"Day5-Materi-{P}-User-Centred-UX-Design.docx"),
        ("day5-task.md", f"Day5-Task-{P}-LearnBase-User-Centred-Analysis-and-UX-Strategy.docx"),
    ],
    6: [
        ("day6-materi.md", f"Day6-Materi-{P}-Personas-and-User-Journeys.docx"),
        ("day6-task.md", f"Day6-Task-{P}-EduPath-Personas-Journeys-and-Segmentation-Strategy.docx"),
    ],
    7: [
        ("day7-materi.md", f"Day7-Materi-{P}-Accessibility-and-Inclusive-Design.docx"),
        ("day7-task.md", f"Day7-Task-{P}-InclusiveLearn-Barrier-Analysis-and-Inclusive-UX-Strategy.docx"),
    ],
    8: [
        ("day8-materi.md", f"Day8-Materi-{P}-UX-UI-Structure-Visual-Hierarchy-and-Interaction.docx"),
        ("day8-task.md", f"Day8-Task-{P}-StructLearn-Structure-Analysis-and-Basic-UX-UI-Structure.docx"),
    ],
}


def main(days):
    for d in days:
        try:
            mod = importlib.import_module(f"figs_day{d}")
            for f in mod.ALL:
                f()
        except ModuleNotFoundError:
            pass
        for src, out in MANIFEST.get(d, []):
            sp = os.path.join(ROOT, "_source", src)
            if not os.path.exists(sp):
                print("skip (no source yet):", src)
                continue
            md2docx.build(sp, os.path.join(ROOT, out))
            print("built", out)


if __name__ == "__main__":
    days = [int(x) for x in sys.argv[1:]] or sorted(MANIFEST)
    main(days)
