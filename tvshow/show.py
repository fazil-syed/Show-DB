from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)


bp = Blueprint('show', __name__, url_prefix='/show')
@bp.route('/<string:id>')
def show(id):
    return render_template('show.html', id=id)