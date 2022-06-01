console.log('zooming.js');

enum cssVariable {
    width = '---width',
    height = '---height',
    x = '---x',
    y = '---y'
}

enum cssClasses {
    body = 'zooming-body',
    inZooming = 'in-zooming',
    outZooming = 'out-zooming'
}

enum frameOperations {
    in = 'in',
    out = 'out'
}

type RectContext = {
    viewportWidth: number,
    viewportHeight: number
}

interface ZoomingPrototype$helper {
    toggle(target: HTMLElement): void
}
interface ZoomingPrototype {
    getRectContext(): RectContext,
    toggleZoomInOut(targetFrame: HTMLElement, operation: frameOperations): void,
    in(index: HTMLElement): void,
    out(index: HTMLElement): void,
}
interface ZoomingInnerThis {
    bodyClientRect: DOMRect
    cssClasses: typeof cssClasses,
    helper: ZoomingPrototype$helper
}
interface Zooming extends ZoomingPrototype, ZoomingInnerThis { }



function _zooming(this: Zooming): void {
    const body: HTMLElement = document.body
    const bodyClientRect = body.getBoundingClientRect();

    body.classList.add(cssClasses.body)

    this.bodyClientRect = bodyClientRect
    this.cssClasses = cssClasses
    this.helper = {
        toggle: (target) => {
            const classList = target.classList
            switch (true) {
                case classList.contains(zooming.cssClasses.outZooming):
                    this.in(target)
                    break;
                case classList.contains(zooming.cssClasses.inZooming):
                    zooming.out(target)
                    break;
                default:
                    zooming.in(target)
            }
        }
    }
}
_zooming.prototype.getRectContext = function (): RectContext {
    const viewportWidth = this.bodyClientRect.width as number
    const viewportHeight = this.bodyClientRect.height as number
    return {
        viewportWidth,
        viewportHeight
    }
}
_zooming.prototype.toggleZoomInOut = function (targetFrame: HTMLElement, operation: frameOperations) {
    if (operation in frameOperations) {
        if (operation === frameOperations.in) {
            targetFrame.classList.add(cssClasses.inZooming)
            targetFrame.classList.remove(cssClasses.inZooming)
        }
        switch (operation) {
            case frameOperations.in:
                targetFrame.classList.add(cssClasses.inZooming)
                targetFrame.classList.remove(cssClasses.outZooming)
                break
            case frameOperations.out:
                targetFrame.classList.add(cssClasses.outZooming)
                targetFrame.classList.remove(cssClasses.inZooming)
                break
            default:
                break
        }
    }

}

_zooming.prototype.in = function (target: HTMLDivElement) {
    const _this: Zooming = this
    const { viewportWidth, viewportHeight } = _this.getRectContext()

    const targetFrame: HTMLElement = target

    _this.toggleZoomInOut(targetFrame, frameOperations.in)

    targetFrame.style.setProperty(cssVariable.width, `${viewportWidth}px`)
    targetFrame.style.setProperty(cssVariable.height, `${viewportHeight}px`)
    targetFrame.style.setProperty(cssVariable.x, `0`)
    targetFrame.style.setProperty(cssVariable.y, `0`)

    targetFrame.classList.add(cssClasses.inZooming)
}

_zooming.prototype.out = function (target: HTMLDivElement) {
    const targetFrame: HTMLElement = target
    this.toggleZoomInOut(targetFrame, frameOperations.out)

    targetFrame.style.setProperty(cssVariable.width, `${targetFrame.dataset.framemetaWidth}`)
    targetFrame.style.setProperty(cssVariable.height, `${targetFrame.dataset.framemetaHeight}`)
    targetFrame.style.setProperty(cssVariable.x, `${targetFrame.dataset.framemetaX}`)
    targetFrame.style.setProperty(cssVariable.y, `${targetFrame.dataset.framemetaY}`)

    console.log(targetFrame)
}

export const zooming: Zooming = new _zooming()

