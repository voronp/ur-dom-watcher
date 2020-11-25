const watchersAdd = [];
const watchersRemove = [];
const observer = new MutationObserver((mutations) => {
    for(let mutation of mutations) {
        if(watchersAdd.length) {
            for(let node of mutation.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;
                for (let watcher of watchersAdd) {
                    if (node.matches(watcher.selector)) {
                        watcher.callback.call(node)
                    }
                    node.querySelectorAll(watcher.selector).forEach(inside => watcher.callback.call(inside))
                }
            }
        }
        if(watchersRemove.length) {
            for(let node of mutation.removedNodes) {
                if (!(node instanceof HTMLElement)) continue;
                for (let watcher of watchersRemove) {
                    if (node.matches(watcher.selector)) {
                        watcher.callback.call(node)
                    }
                    node.querySelectorAll(watcher.selector).forEach(inside => watcher.callback.call(inside))
                }
            }
        }
    }
});

observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true,
});

export function watchForAddedElements(selector, callback) {

    watchersAdd.push({
        selector,
        callback,
    });
    return () => {
        const i = watchersAdd.findIndex(v => v.callback === callback);
        return i > -1 && watchersAdd.splice(i, 1)
    }

}

export function watchForRemovedElements(selector, callback) {

    watchersRemove.push({
        selector,
        callback,
    });

    return () => {
        const i = watchersRemove.findIndex(v => v.callback === callback);
        return i > -1 && watchersRemove.splice(i, 1)
    }

}
