export default function promiseToRSVP({types: t}) {
	return {
		visitor: {
			ReferencedIdentifier(path, state) {
				const {node, parent, scope} = path;

				if (node.name !== 'Promise') return;
				if (t.isMemberExpression(parent)) return;
				if (scope.getBindingIdentifier('Promise')) return;

				path.replaceWith(state.addImport('rsvp', 'default', 'Promise'));
			},

			MemberExpression(path, state) {
				const {node} = path;
				const obj = node.object;

				if (obj.name !== 'Promise') return;
				if (!path.isReferenced()) return;
				if (path.scope.getBindingIdentifier('Promise')) return;

				if (node.computed) {
					path.replaceWith(
						t.memberExpression(
							state.addImport('rsvp', 'default', 'Promise'),
							node.property,
							true
						)
					);
				} else {
					path.replaceWith(state.addImport('rsvp', node.property.name, 'Promise'));
				}
			},
		},
	};
}
